"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type Campaign = {
  id: string;
  date: string;
  startDate: string;
  endDate: string;
  emailCategory: string;
  campaignName: string;
  subjectLine: string;
  owner: string;
  status: string;
  industryVertical: string;
  senderUrl: string;
};

export const columns: ColumnDef<Campaign>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const formatted = date.toLocaleDateString();
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("startDate"));
      const formatted = date.toLocaleDateString();
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("endDate"));
      const formatted = date.toLocaleDateString();
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "emailCategory",
    header: "Category",
  },
  {
    accessorKey: "campaignName",
    header: "Name",
  },
  {
    accessorKey: "subjectLine",
    header: "Subject Line",
  },
  {
    accessorKey: "owner",
    header: "Owner",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "industryVertical",
    header: "Vertical",
  },
  {
    accessorKey: "senderUrl",
    header: "Sender URL",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
