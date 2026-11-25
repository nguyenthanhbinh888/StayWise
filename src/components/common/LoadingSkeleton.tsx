import React from "react";
import { cn } from "@/lib/utils";

export const LoadingSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return <div className={cn("animate-pulse bg-gray-200/80 rounded-xl", className)} />;
};

export const CardSkeleton: React.FC = () => {
  return (
    <div className="p-5 bg-white rounded-2xl border border-border shadow-card space-y-4">
      <div className="flex justify-between items-start">
        <LoadingSkeleton className="h-6 w-32" />
        <LoadingSkeleton className="h-5 w-16 rounded-full" />
      </div>
      <LoadingSkeleton className="h-12 w-full" />
      <div className="grid grid-cols-2 gap-2">
        <LoadingSkeleton className="h-8 w-full" />
        <LoadingSkeleton className="h-8 w-full" />
      </div>
    </div>
  );
};
