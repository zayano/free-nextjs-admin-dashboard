import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import RequestTable from "@/components/tables/RequestTable";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Next.js Request Table | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Request Table page for TailAdmin Tailwind CSS Admin Dashboard Template",
  // other metadata
};

export default function RequestTables() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Request Table" />
      <div className="space-y-6">
        <ComponentCard title="Request Table 1">
          <RequestTable />
        </ComponentCard>
      </div>
    </div>
  );
}
