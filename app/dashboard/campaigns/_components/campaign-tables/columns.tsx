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
    enableHiding: true,
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const formatted = date.toLocaleDateString();
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    enableHiding: true,
    cell: ({ row }) => {
      const date = new Date(row.getValue("startDate"));
      const formatted = date.toLocaleDateString();
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    enableHiding: true,
    cell: ({ row }) => {
      const date = new Date(row.getValue("endDate"));
      const formatted = date.toLocaleDateString();
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "emailCategory",
    header: "Category",
    enableHiding: true,
  },
  {
    accessorKey: "campaignName",
    header: "Name",
    enableHiding: true,
  },
  {
    accessorKey: "subjectLine",
    header: "Subject Line",
    enableHiding: true,
  },
  {
    accessorKey: "owner",
    header: "Owner",
    enableHiding: true,
  },
  {
    accessorKey: "status",
    header: "Status",
    enableHiding: true,
  },
  {
    accessorKey: "industryVertical",
    header: "Vertical",
    enableHiding: true,
  },
  {
    accessorKey: "senderUrl",
    header: "Sender URL",
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
