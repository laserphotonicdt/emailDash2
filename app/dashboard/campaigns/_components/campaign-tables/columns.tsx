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
  },
  {
    accessorKey: "startDate",
    header: "Campaign Start Date",
  },
  {
    accessorKey: "endDate",
    header: "Campaign End Date",
  },
  {
    accessorKey: "emailCategory",
    header: "Email Category",
  },
  {
    accessorKey: "campaignName",
    header: "Campaign Name",
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
    header: "Industry Vertical",
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
