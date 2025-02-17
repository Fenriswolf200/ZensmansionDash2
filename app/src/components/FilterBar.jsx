const FilterBar = ({ setSort }) => {
  return (
    <div className="mb-4">
      <button onClick={() => setSort("profit")} className="mr-2 px-4 py-2 bg-blue-500 text-white rounded">Sort by Profit</button>
      <button onClick={() => setSort("price")} className="px-4 py-2 bg-green-500 text-white rounded">Sort by Price</button>
    </div>
  );
};

export default FilterBar;
