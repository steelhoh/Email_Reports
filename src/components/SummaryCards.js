import React, { useMemo } from "react";

const SummaryCards = ({ data }) => {
  const stats = useMemo(() => {
    const parseNum = (val) => parseFloat(val?.toString().replace(/[^0-9.-]+/g, "")) || 0;

    let totalOpens = 0;
    let totalClicks = 0;
    let totalPlacedOrder = 0;
    let totalOrderValue = 0;

    data.forEach((row) => {
      totalOpens += parseNum(row["Unique Opens"]);
      totalClicks += parseNum(row["Total Clicks"]);
      totalPlacedOrder += parseNum(row["Total Placed Order"]);
      totalOrderValue += parseNum(row["Total Placed Order Value"]);
    });

    const ctr = totalOpens ? (totalClicks / totalOpens) * 100 : 0;
    const placedOrderRate = totalOpens
    ? (totalPlacedOrder / totalOpens) * 100
    : 0;

    return {
      totalOpens,
      totalClicks,
      ctr,
      totalPlacedOrder,
      totalOrderValue,
      placedOrderRate,
    };
  }, [data]);

  const cardClass =
    "bg-white shadow p-4 rounded-xl w-full sm:w-1/3 lg:w-1/4 flex flex-col gap-1";

  return (
    <div className="flex flex-wrap gap-4">
      <div className={cardClass}>
        <h4 className="text-sm text-gray-500">Unique Opens</h4>
        <p className="text-xl font-bold">{stats.totalOpens}</p>
      </div>
      <div className={cardClass}>
        <h4 className="text-sm text-gray-500">Total Clicks</h4>
        <p className="text-xl font-bold">{stats.totalClicks}</p>
      </div>
      <div className={cardClass}>
        <h4 className="text-sm text-gray-500">CTR (Clicks ÷ Opens)</h4>
        <p className="text-xl font-bold">{stats.ctr.toFixed(2)}%</p>
      </div>
      <div className={cardClass}>
        <h4 className="text-sm text-gray-500">Total Placed Orders</h4>
        <p className="text-xl font-bold">{stats.totalPlacedOrder}</p>
      </div>
      <div className={cardClass}>
        <h4 className="text-sm text-gray-500">Order Value</h4>
        <p className="text-xl font-bold">${stats.totalOrderValue.toFixed(2)}</p>
      </div>
      <div className={cardClass}>
        <h4 className="text-sm text-gray-500">Placed Order Rate</h4>
        <p className="text-xl font-bold">{stats.placedOrderRate.toFixed(2)}%</p>
      </div>
    </div>
  );
};

export default SummaryCards;
