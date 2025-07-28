import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from 'react'


export const metadata: Metadata = {
  title: "Development Form Requests | Development - Development Dashboard Assessment",
  description:
    "This is the Form Requests page for the Development Dashboard Assessment",
};


export default function FormRequests() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Form Requests" />


    </div>
  )
}
