"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FunnelChart, FunnelSeries, FunnelArc, FunnelLabel } from "reaviz";

const CustomFunnelLabel = ({ data }) => (
  <g>
    <text
      dy={-30}
      textAnchor="middle"
      fontSize="14"
      fill="var(--text-color, #333)"
    >
      {`${data.percentage.toFixed(2)}%`}
    </text>
    <text
      dy={-10}
      textAnchor="middle"
      fontSize="14"
      fill="var(--text-color, #333)"
    >
      {data.data.toLocaleString()}
    </text>
    <text
      dy={10}
      textAnchor="middle"
      fontSize="14"
      fill="var(--text-color, #333)"
    >
      {data.key}
    </text>
  </g>
);

const FunnelGraphCard = () => {
  const data = [
    {
      key: "Total Emails Sent",
      data: 882498,
      percentage: 100,
      metadata: { subLabels: [30, 126, 200, 367] },
    },
    {
      key: "Emails Delivered",
      data: 727796,
      percentage: 82.47,
      metadata: { subLabels: [20, 78, 168, 200] },
    },
    {
      key: "Emails Opened",
      data: 165115,
      percentage: 18.74,
      metadata: { subLabels: [10, 42, 75, 110] },
    },
    {
      key: "Email Clicks",
      data: 130440,
      percentage: 79.28,
      metadata: { subLabels: [5, 10, 25, 35] },
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Data Funnel</CardTitle>
      </CardHeader>
      <CardContent>
        <FunnelChart
          data={data}
          height={360}
          width={"100%"}
          direction="horizontal"
          series={
            <FunnelSeries
              arc={
                <FunnelArc
                  colorScheme={["#dc000055", "#dc0000", "#780000", "#fdc500"]}
                  variant="layered"
                  gradient={null}
                  strokeWidth={1}
                />
              }
              label={
                <FunnelLabel
                  position="top"
                  format={(d) => <CustomFunnelLabel data={d} />}
                />
              }
            />
          }
        />
      </CardContent>
    </Card>
  );
};

export default FunnelGraphCard;
