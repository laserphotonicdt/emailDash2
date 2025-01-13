"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { ArrowUpDown } from "lucide-react";

export type Campaign = {
  id: string;
  date: string;
  campaign_name_id: string;
  subjectLine: string;
  owner: string;
  status: string;
  total_emails_sent: number;
  total_emails_delivered: number;
  total_emails_opened: number;
  total_clicks: number;
  deliverability: number;
  open_rate: number;
  clickthrough_rate: number;
  industryVertical: string;
  senderUrl: string;
};

export const columns: ColumnDef<Campaign>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return <div className="flex items-center">Date</div>;
    },
    enableHiding: true,
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      const dateA = new Date(rowA.getValue("date"));
      const dateB = new Date(rowB.getValue("date"));
      return dateA.getTime() - dateB.getTime();
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const formatted = date.toLocaleDateString();
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "campaign_name_id",
    header: ({ column }) => {
      return <div className="flex items-center">Campaign ID</div>;
    },
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "subjectLine",
    header: ({ column }) => {
      return <div className="flex items-center">Subject Line</div>;
    },
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "owner",
    header: ({ column }) => {
      return <div className="flex items-center">Owner</div>;
    },
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "status",
    header: "Status",
    enableHiding: true,
  },
  {
    accessorKey: "total_emails_sent",
    header: ({ column }) => {
      return <div className="flex items-center">Sent</div>;
    },
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "total_emails_delivered",
    header: ({ column }) => {
      return <div className="flex items-center">Delivered</div>;
    },
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "total_emails_opened",
    header: ({ column }) => {
      return <div className="flex items-center">Opened</div>;
    },
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "total_clicks",
    header: ({ column }) => {
      return <div className="flex items-center">Clicks</div>;
    },
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "deliverability",
    header: ({ column }) => {
      return <div className="flex items-center">Deliverability</div>;
    },
    enableHiding: true,
    enableSorting: true,
    cell: ({ row }) => {
      const value = Number(row.getValue("deliverability"));
      return <div className="font-medium">{value.toFixed(2)}%</div>;
    },
  },
  {
    accessorKey: "open_rate",
    header: ({ column }) => {
      return <div className="flex items-center">Open Rate</div>;
    },
    enableHiding: true,
    enableSorting: true,
    cell: ({ row }) => {
      const value = Number(row.getValue("open_rate"));
      return <div className="font-medium">{value.toFixed(2)}%</div>;
    },
  },
  {
    accessorKey: "clickthrough_rate",
    header: ({ column }) => {
      return <div className="flex items-center">Click Through</div>;
    },
    enableHiding: true,
    enableSorting: true,
    cell: ({ row }) => {
      const value = Number(row.getValue("clickthrough_rate"));
      return <div className="font-medium">{value.toFixed(2)}%</div>;
    },
  },
  {
    accessorKey: "industryVertical",
    header: ({ column }) => {
      return <div className="flex items-center">Industry</div>;
    },
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "senderUrl",
    header: ({ column }) => {
      return <div className="flex items-center">Sender URL</div>;
    },
    enableHiding: true,
    enableSorting: true,
    cell: ({ row }) => {
      const url = row.getValue("senderUrl") as string;
      return (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 hover:underline"
        >
          {url}
        </a>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
