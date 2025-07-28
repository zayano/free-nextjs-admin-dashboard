"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import Badge from "../ui/badge/Badge";
import Pagination from "./Pagination";

interface Request {
  id: number;
  module: string;
  name: string;
  priority: string;
  description: string;
  status: string;
  relation: string;
  createdAt: string;
  requestedBy: string;
  notes: string;
  reference: File | null; // Assuming reference can be a file or null
}

// Define the table data using the interface
const tableData: Request[] = [
  {
    id: 1,
    module: "User Management",
    name: "Add New User",
    priority: "High",
    description: "Need to add a new user to the system.",
    status: "Dalam Review",
    relation: "None",
    createdAt: "2023-10-01",
    requestedBy: "Admin",
    notes: "Urgent request for new user creation.",
    reference: null, // Assuming no file reference for this request
  },
  {
    id: 2,
    module: "Content Management",
    name: "Update Homepage Content",
    priority: "Medium",
    description: "Update the text and images on the homepage.",
    status: "Di Setujui",
    relation: "Homepage",
    createdAt: "2023-10-02",
    requestedBy: "Content Team",
    notes: "Need to refresh the homepage content.",
    reference: null, // Assuming no file reference for this request
  },
  {
    id: 3,
    module: "Analytics",
    name: "Add New Analytics Dashboard",
    priority: "Low",
    description: "Create a new dashboard for analytics tracking.",
    status: "Draft",
    relation: "Analytics Module",
    createdAt: "2023-10-03",
    requestedBy: "Analytics Team",
    notes: "Dashboard created successfully.",
    reference: null, // Assuming no file reference for this request
  },
  // Add more requests as needed
];

export default function RequestTable() {
  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  ID
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Modul/Halaman
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Nama Kebutuhan
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Prioritas
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Deskripsi
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Relasi
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Tanggal Buat
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Di Request Oleh
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Catatan
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Referensi
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {tableData.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        {request.id}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {request.module}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {request.name}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        request.priority === "Low"
                          ? "success"
                          : request.priority === "Medium"
                          ? "warning"
                          : "error"
                      }
                    >
                      {request.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {request.description}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        request.status === "Di Setujui"
                          ? "success"
                          : request.status === "Dalam Review"
                          ? "warning"
                          : request.status === "Draft"
                          ? "info"
                          : "error"
                      }
                    >
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {request.relation}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {request.requestedBy}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {request.notes}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {request.reference ? (
                      <a
                        href={URL.createObjectURL(request.reference)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        View File
                      </a>
                    ) : (
                      "No Reference"
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

        </div>
      </div>
    </div>
        <Pagination currentPage={0} totalPages={10} onPageChange={() => {}}/>
    </div>
  );
}
