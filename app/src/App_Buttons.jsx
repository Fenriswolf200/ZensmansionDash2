import { useState } from "react";
import { Button, Input, Select } from "@/components/ui";

export default function Dashboard() {
  const [apiKey, setApiKey] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState("Today");

  const saveUserParameters = async () => {
    const userParams = { apiKey, minPrice, maxPrice, searchTerm, dateRange };
    await fetch("/save-user-params", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userParams),
    });
  };

  const runScraper = async () => {
    await fetch("/run-scraper", { method: "POST" });
  };

  return (
    <div className="p-4 space-y-4">
      <Input
        placeholder="eBay API Key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
      />
      <Input
        placeholder="Min Price"
        type="number"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <Input
        placeholder="Max Price"
        type="number"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
      <Input
        placeholder="Search Term"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
        <option>Today</option>
        <option>1</option>
        <option>3</option>
        <option>7</option>
        <option>14</option>
      </Select>
      <Button onClick={saveUserParameters}>Save Settings</Button>
      <Button onClick={runScraper} className="bg-green-500">Run Scraper</Button>
    </div>
  );
}
