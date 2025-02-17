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
