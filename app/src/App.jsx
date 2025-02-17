import React, { useState, useEffect } from "react";
import ListingCard from "./components/ListingCard.jsx";
import FilterBar from "./components/FilterBar.jsx";

const App = () => {
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState(null);
  const [sortOrder, setSortOrder] = useState('desc');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const transformData = (rawData) => {
    const transformedProducts = [];
    
    // Iterate through the dates
    Object.entries(rawData).forEach(([date, dateData]) => {
      // Iterate through each product in the date
      Object.entries(dateData).forEach(([productName, productData]) => {
        // Get the first eBay listing (for demonstration)
        const ebayListings = productData["eBay Data"] || {};
        const firstEbayListing = Object.values(ebayListings)[0] || {};
        
        // Get the Goofish data
        const goofishData = productData["Goofish Data"] || {};
        
        // Create transformed product
        transformedProducts.push({
          id: `${date}-${productName}`,
          title: productName,
          ebay_price: parseFloat(firstEbayListing.Price || "0"),
          chinese_price_rmb: parseFloat(goofishData.Price || "0"),
          chinese_price_usd: parseFloat(goofishData.Price || "0") / 7.2, // Approximate RMB to USD conversion
          ebay_link: firstEbayListing.listing_link || "#",
          china_link: goofishData.listing_link || "#",
          image: firstEbayListing.img_link || goofishData.img_link || "https://via.placeholder.com/150"
        });
      });
    });
    
    return transformedProducts;
  };

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching data...');
      const response = await fetch("/data.json");
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const rawData = await response.json();
      console.log('Raw data loaded:', rawData);
      
      const transformedData = transformData(rawData);
      console.log('Transformed data:', transformedData);
      
      setProducts(transformedData);
    } catch (err) {
      console.error('Error loading data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const sortedProducts = [...products].sort((a, b) => {
    const getProfit = (product) => 
      ((product.ebay_price - product.chinese_price_usd) / product.chinese_price_usd) * 100;
    
    let comparison = 0;
    if (sort === "profit") {
      comparison = getProfit(b) - getProfit(a);
    } else if (sort === "price") {
      comparison = b.ebay_price - a.ebay_price;
    }
    
    return sortOrder === 'asc' ? -comparison : comparison;
  });

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Error loading data</h1>
        <p className="text-red-500">{error}</p>
        <button 
          onClick={loadData}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">E-commerce Price Dashboard</h1>
      <FilterBar 
        setSort={setSort}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        refreshData={loadData}
      />
      {products.length === 0 ? (
        <p className="text-gray-500">No products found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedProducts.map((product) => (
            <ListingCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;