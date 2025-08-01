"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import Badge from "../ui/badge/Badge";
import Pagination from "./Pagination";
import { useRequests } from "@/context/RequestContext";
import NotFound from "@/app/not-found";

export default function RequestTable() {
    const { requests, isLoading } = useRequests();
    const FileCell = ({ reference }: { reference: File | string | null }) => {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  useEffect(() => {
    // Cleanup function
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [objectUrl]);

  if (!reference) {
    return <span>No Reference</span>;
  }

  // Jika reference adalah File object
  if (reference instanceof File) {
    if (!objectUrl) {
      try {
        const url = URL.createObjectURL(reference);
        setObjectUrl(url);
      } catch (error) {
        console.error('Failed to create object URL:', error);
        return <span className="text-red-500">Invalid File</span>;
      }
    }

    return (
      <a
        href={objectUrl ?? ''}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
        onClick={() => {
          // Revoke URL setelah 1 menit (opsional)
          setTimeout(() => {
            if (objectUrl) URL.revokeObjectURL(objectUrl);
            setObjectUrl(null);
          }, 60000);
        }}
      >
        View File ({reference.name})
      </a>
    );
  }

  // Jika reference adalah URL string
  if (typeof reference === 'string') {
    return (
      <a
        href={reference}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        View File
      </a>
    );
  }

  return <span className="text-yellow-500">Unsupported Reference Type</span>;
};

    if (isLoading) {
    return <div>Loading requests...</div>;
  }

  if (requests.length === 0) {
    return (
      <NotFound
        
       
      />
    );
  }

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
              {requests.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((request) => (
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
  <FileCell reference={request.reference} />
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
