"use client";
import React from "react";
import Badge from "../ui/badge/Badge";
import { ArrowDownIcon, ArrowUpIcon, BoxIconLine, ShootingStarIcon } from "@/icons";
import { useRequests } from "@/context/RequestContext";

export const EcommerceMetrics = () => {
  const { requests, isLoading } = useRequests();

  const calculatePercentageChange = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const previousPeriodCount = 0; // Simulasi
  const currentCount = requests.length;
  const percentageChange = calculatePercentageChange(currentCount, previousPeriodCount);

  const isIncrease = percentageChange >= 0;
  const badgeColor = isIncrease ? "success" : "error";
  const ChangeIcon = isIncrease ? ArrowUpIcon : ArrowDownIcon;

  const highPriorityCount = requests.filter((r) => r.priority?.toLowerCase() === "high").length;

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      
      {/* High Priority Requests */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <ShootingStarIcon className="text-red-500 dark:text-red-400 size-6" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              High Priority Requests
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {highPriorityCount}
            </h4>
          </div>
          <Badge color="warning">
            <ShootingStarIcon className="text-warning-500" />
            Prioritas Tinggi
          </Badge>
        </div>
      </div>

      {/* Requests */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <BoxIconLine className="text-gray-800 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Requests
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {currentCount}
            </h4>
          </div>

          <Badge color={badgeColor}>
            <ChangeIcon className={isIncrease ? "text-success-500" : "text-error-500"} />
            {Math.abs(percentageChange).toFixed(2)}%
          </Badge>
        </div>
      </div>
    </div>
  );
};
