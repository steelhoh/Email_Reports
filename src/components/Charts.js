import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Charts = ({ data }) => {
  const chartData = useMemo(() => {
    return data
      .filter((row) => row["Send Time"])
      .map((row) => {
        const sends = parseFloat(row["Sends"]) || 0;
        const opens = parseFloat(row["Opens"]) || 0;
        const clicks = parseFloat(row["Clicks"]) || 0;
        return {
          sendTime: row["Send Time"],
          sends,
          opens,
          clicks,
          openRate: sends ? (opens / sends) * 100 : 0,
          clickRate: sends ? (clicks / sends) * 100 : 0,
        };
      });
  }, [data]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-2">📈 Open Rate Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="sendTime" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="openRate"
              stroke="#3b82f6"
              name="Open Rate (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-2">📊 Click Rate Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="sendTime" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="clickRate" fill="#10b981" name="Click Rate (%)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;