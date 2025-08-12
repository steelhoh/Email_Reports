import React, { useState, useMemo } from "react";
import Filters from "./Filters";
import SummaryCards from "./SummaryCards";
import Charts from "./Charts";
import DataTable from "./DataTable";

const Dashboard = ({ data }) => {
  const [campaign, setCampaign] = useState("");
  const [list, setList] = useState("");

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const campaignMatch = campaign ? row["Campaign Name"] === campaign : true;
      const listMatch = list ? row["List Name"] === list : true;
      return campaignMatch && listMatch;
    });
  }, [data, campaign, list]);

  return (
    <div className="space-y-6">
      <Filters
        data={data}
        selectedCampaign={campaign}
        setCampaign={setCampaign}
        selectedList={list}
        setList={setList}
      />
      <SummaryCards data={filteredData} />
      <Charts data={filteredData} />
      <DataTable data={filteredData} />
    </div>
  );
};

export default Dashboard;