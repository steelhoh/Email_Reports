import React, { useState, useMemo } from "react";

const DataTable = ({ data }) => {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  const filteredData = useMemo(() => {
    return data
      .filter((row) =>
        Object.values(row)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase())
      )
      .sort((a, b) => {
        if (!sortKey) return 0;
        const aVal = a[sortKey] || "";
        const bVal = b[sortKey] || "";
        const aNum = parseFloat(aVal);
        const bNum = parseFloat(bVal);
        const isNumber = !isNaN(aNum) && !isNaN(bNum);
        if (isNumber) {
          return sortAsc ? aNum - bNum : bNum - aNum;
        }
        return sortAsc
          ? aVal.toString().localeCompare(bVal)
          : bVal.toString().localeCompare(aVal);
      });
  }, [data, search, sortKey, sortAsc]);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow mt-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">📋 Email Records Table</h3>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-2 py-1 rounded-md"
        />
      </div>
      <div className="overflow-auto max-h-[500px]">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr>
              {headers.map((key) => (
                <th
                  key={key}
                  className="p-2 border-b cursor-pointer bg-gray-100 sticky top-0"
                  onClick={() => handleSort(key)}
                >
                  {key}
                  {sortKey === key ? (sortAsc ? " ▲" : " ▼") : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                {headers.map((key) => (
                  <td key={key} className="p-2 border-b">
                    {row[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;