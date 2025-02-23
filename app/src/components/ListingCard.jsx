/*
const ListingCard = ({ product }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <img src={product.image} alt={product.title} className="w-full h-32 object-cover rounded" />
      <h3 className="text-lg font-bold">{product.title}</h3>
      <p>Ebay Price: ${product.ebay_price}</p>
      <p>Chinese Price: ¥{product.chinese_price_rmb} / ${product.chinese_price_usd}</p>
      <p>Profit: {(((product.ebay_price - product.chinese_price_usd) / product.chinese_price_usd) * 100).toFixed(2)}%</p>
      <div className="mt-2">
        <a href={product.ebay_link} className="text-blue-500 mr-2">eBay</a>
        <a href={product.china_link} className="text-green-500">China</a>
      </div>
    </div>
  );
};

export default ListingCard;

*/
import React from "react";

const ListingCard = ({ product }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      {/* Container for the two images */}
      <div className="flex space-x-2">
        <img
          src={product.ebayImage}
          alt={`${product.title} eBay`}
          className="w-1/2 h-32 object-cover rounded"
        />
        <img
          src={product.goofishImage}
          alt={`${product.title} Goofish`}
          className="w-1/2 h-32 object-cover rounded"
        />
      </div>
      <h3 className="text-lg font-bold mt-2">{product.title}</h3>
      <p>Ebay Price: ${product.ebay_price}</p>
      <p>Chinese Price: ¥{product.chinese_price_rmb} / ${product.chinese_price_usd}</p>
      <p>
        Profit:{" "}
        {(((product.ebay_price - product.chinese_price_usd) / product.chinese_price_usd) *
          100).toFixed(2)}
        %
      </p>
      <div className="mt-2">
        <a href={product.ebay_link} className="text-blue-500 mr-2">
          eBay
        </a>
        <a href={product.china_link} className="text-green-500">
          China
        </a>
      </div>
    </div>
  );
};

export default ListingCard;