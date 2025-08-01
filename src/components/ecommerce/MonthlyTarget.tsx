"use client";
// import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

import dynamic from "next/dynamic";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { ArrowDownIcon, ArrowUpIcon, MoreDotIcon } from "@/icons";
import { useState } from "react";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { useRequests } from "@/context/RequestContext";
// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function MonthlyTarget() {
  const { requests } = useRequests();

// Contoh: target bulanan
const monthlyTarget = 50;

const today = new Date();
const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

// Hitung jumlah request bulan ini
const requestsThisMonth = requests.filter((r) => {
  const date = new Date(r.createdAt);
  return (
    date.getMonth() === currentMonth &&
    date.getFullYear() === currentYear
  );
}).length;

// Hitung jumlah request hari ini
const requestsToday = requests.filter((r) => {
  const d = new Date(r.createdAt);
  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === currentMonth &&
    d.getFullYear() === currentYear
  );
}).length;

// Bandingkan pencapaian target
// const progress = (requestsThisMonth / monthlyTarget) * 100;
const isTargetMet = requestsThisMonth >= monthlyTarget;

// Hitung persentase pencapaian
const progressPercent = Math.min(
  ((requestsThisMonth / monthlyTarget) * 100),
  100
);

const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

const requestsLastMonth = requests.filter((r) => {
  const date = new Date(r.createdAt);
  return (
    date.getMonth() === lastMonth &&
    date.getFullYear() === lastMonthYear
  );
}).length;

const growth = requestsLastMonth === 0
  ? 0
  : ((requestsThisMonth - requestsLastMonth) / requestsLastMonth) * 100;

const isGrowthPositive = growth >= 0;


const series = [parseFloat(progressPercent.toFixed(2))];
  const options: ApexOptions = {
    colors: [progressPercent >= 100 ? "#22C55E" : "#465FFF"],

    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "radialBar",
      height: 330,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -85,
        endAngle: 85,
        hollow: {
          size: "80%",
        },
        track: {
          background: "#E4E7EC",
          strokeWidth: "100%",
          margin: 5, // margin is in pixels
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: "36px",
            fontWeight: "600",
            offsetY: -40,
            color: "#1D2939",
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      },
    },
    fill: {
      type: "solid",
      colors: ["#465FFF"],
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Progress"],
  };

  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Monthly Target
            </h3>
            <p className="mt-1 font-normal text-gray-500 text-theme-sm dark:text-gray-400">
              Target you’ve set for each month
            </p>
          </div>
          <div className="relative inline-block">
            <button onClick={toggleDropdown} className="dropdown-toggle">
              <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
            </button>
            <Dropdown
              isOpen={isOpen}
              onClose={closeDropdown}
              className="w-40 p-2"
            >
              <DropdownItem
                tag="a"
                onItemClick={closeDropdown}
                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                View More
              </DropdownItem>
              <DropdownItem
                tag="a"
                onItemClick={closeDropdown}
                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                Delete
              </DropdownItem>
            </Dropdown>
          </div>
        </div>
        <div className="relative ">
          <div className="max-h-[330px]">
            <ReactApexChart
              options={options}
              series={series}
              type="radialBar"
              height={330}
            />
          </div>

          <span
  className={`absolute left-1/2 top-full -translate-x-1/2 -translate-y-[95%] rounded-full px-3 py-1 text-xs font-medium
    ${isGrowthPositive
      ? "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500"
      : "bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500"}
  `}
>
  {isGrowthPositive ? "+" : ""}
  {Math.abs(growth).toFixed(1)}%
</span>
        </div>
        <p className="mx-auto mt-10 w-full max-w-[380px] text-center text-sm text-gray-500 sm:text-base">
          {requestsThisMonth} of {monthlyTarget} requests submitted this month.
        </p>
      </div>

      <div className="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">
  {/* Target */}
  <div>
    <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
      Target
    </p>
    <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
      {monthlyTarget}
      {isTargetMet ? (
        <ArrowUpIcon className="text-success-500" />
      ) : (
        <ArrowDownIcon className="text-error-500" />
      )}
    </p>
  </div>

  <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

  {/* Revenue */}
  <div>
    <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
      This Month
    </p>
    <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
      {requestsThisMonth}
      <ArrowUpIcon className="text-success-500" />
    </p>
  </div>

  <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

  {/* Today */}
  <div>
    <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
      Today
    </p>
    <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
      {requestsToday}
      {requestsToday > 0 ? (
        <ArrowUpIcon className="text-success-500" />
      ) : (
        <ArrowDownIcon className="text-error-500" />
      )}
    </p>
  </div>
</div>

    </div>
  );
}
