import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import Papa from "papaparse";

function App() {
  const [data, setData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const filtered = results.data.filter(
          (row) => Object.values(row).some((v) => v && v.trim() !== "")
        );
        setData(filtered);
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-4">📊 Email Campaign Dashboard</h1>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="mb-4"
      />
      {data.length > 0 ? (
        <Dashboard data={data} />
      ) : (
        <p>Upload a CSV to get started.</p>
      )}
    </div>
  );
}

export default App;