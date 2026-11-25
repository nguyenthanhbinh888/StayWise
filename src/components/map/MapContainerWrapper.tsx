"use client";

import dynamic from "next/dynamic";
import React from "react";
import { Area } from "@/types/area";
import { AmenityItem } from "@/types/amenity";
import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";

export type HeatmapMode = "totalCost" | "rent" | "food" | "transport" | "environment" | "flood";

export interface MapProps {
  areas: Area[];
  selectedAreaId?: string | null;
  onSelectArea?: (area: Area) => void;
  heatmapMode?: HeatmapMode;
  showHeatmap?: boolean;
  showAmenities?: boolean;
  amenities?: AmenityItem[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  className?: string;
}

const DynamicLeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="relative w-full h-[500px] bg-gray-100 rounded-2xl border border-border flex flex-col items-center justify-center p-6 text-center">
      <LoadingSkeleton className="w-16 h-16 rounded-full mb-3" />
      <span className="text-xs font-semibold text-textSecondary">Đang tải bản đồ đô thị StayWise...</span>
    </div>
  ),
});

export const MapContainerWrapper: React.FC<MapProps> = (props) => {
  return <DynamicLeafletMap {...props} />;
};

export default MapContainerWrapper;
