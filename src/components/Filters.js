import React, { useMemo } from "react";

const Filters = ({ data, selectedCampaign, setCampaign, selectedList, setList }) => {
  const campaignOptions = useMemo(() => {
    const set = new Set(data.map((row) => row["Campaign Name"]).filter(Boolean));
    return [...set];
  }, [data]);

  const listOptions = useMemo(() => {
    const set = new Set(data.map((row) => row["List Name"]).filter(Boolean));
    return [...set];
  }, [data]);

  return (
    <div className="flex flex-wrap gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Campaign Name</label>
        <select
          value={selectedCampaign}
          onChange={(e) => setCampaign(e.target.value)}
          className="p-2 border rounded-md min-w-[200px]"
        >
          <option value="">All Campaigns</option>
          {campaignOptions.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">List Name</label>
        <select
          value={selectedList}
          onChange={(e) => setList(e.target.value)}
          className="p-2 border rounded-md min-w-[200px]"
        >
          <option value="">All Lists</option>
          {listOptions.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;