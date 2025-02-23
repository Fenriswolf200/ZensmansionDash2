import React, { useState } from "react";

const UserParametersForm = () => {
  const [ebayKey, setEbayKey] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [dateOption, setDateOption] = useState("Today");
  const [searchTerm, setSearchTerm] = useState("");

  const WINDOWS_IP = "http://100.65.199.130:5000";

  const handleSaveParameters = async () => {
    const params = {
      ebay_key: ebayKey,
      min_price: minPrice,
      max_price: maxPrice,
      date_option: dateOption,
      search_term: searchTerm,
    };

    try {
      const response = await fetch(`${WINDOWS_IP}/save-parameters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      if (!response.ok) {
        throw new Error("Failed to save parameters");
      }
      alert("Parameters saved successfully");
    } catch (error) {
      alert("Error saving parameters: " + error.message);
    }
  };

  const handleRunScraper = async () => {
    try {
      const response = await fetch(`${WINDOWS_IP}/run-scraper`, {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Failed to run scraper");
      }
      alert("Scraper executed successfully");
    } catch (error) {
      alert("Error running scraper: " + error.message);
    }
  };

  return (
    <div className="mb-4 p-4 border rounded">
      <h2 className="text-xl font-bold mb-2">User Parameters</h2>
      <div className="mb-2">
        <label className="block">eBay API Key:</label>
        <input
          type="text"
          value={ebayKey}
          onChange={(e) => setEbayKey(e.target.value)}
          className="border rounded p-1 w-full"
          placeholder="Enter eBay API Key"
        />
      </div>
      <div className="mb-2">
        <label className="block">Minimum Price:</label>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border rounded p-1 w-full"
          placeholder="Enter minimum price"
        />
      </div>
      <div className="mb-2">
        <label className="block">Maximum Price:</label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border rounded p-1 w-full"
          placeholder="Enter maximum price"
        />
      </div>
      <div className="mb-2">
        <label className="block">Date Option:</label>
        <select
          value={dateOption}
          onChange={(e) => setDateOption(e.target.value)}
          className="border rounded p-1 w-full"
        >
          <option value="Today">Today</option>
          <option value="1">1</option>
          <option value="3">3</option>
          <option value="7">7</option>
          <option value="14">14</option>
        </select>
      </div>
      <div className="mb-2">
        <label className="block">Search Term:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded p-1 w-full"
          placeholder="Enter search term"
        />
      </div>
      <div className="flex space-x-2">
        <button
          onClick={handleSaveParameters}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Save Parameters
        </button>
        <button
          onClick={handleRunScraper}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Run Scraper
        </button>
      </div>
    </div>
  );
};

export default UserParametersForm;
