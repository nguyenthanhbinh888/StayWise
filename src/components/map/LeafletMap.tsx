"use client";

import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Area } from "@/types/area";
import { AmenityItem } from "@/types/amenity";
import { HeatmapMode } from "./MapContainerWrapper";
import { MapLegend } from "./MapLegend";
import { calculateAreaTotalCost } from "@/lib/calculations/cost";
import { formatCurrencyMillion } from "@/lib/formatting/currency";
import { OfflineMapFallback } from "./OfflineMapFallback";

export interface LeafletMapProps {
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

export const LeafletMap: React.FC<LeafletMapProps> = ({
  areas,
  selectedAreaId,
  onSelectArea,
  heatmapMode = "totalCost",
  showHeatmap = true,
  showAmenities = false,
  amenities = [],
  center,
  zoom = 11,
  height = "520px",
  className = "",
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const heatmapLayerRef = useRef<L.LayerGroup | null>(null);
  const amenitiesLayerRef = useRef<L.LayerGroup | null>(null);
  const [offlineFallback, setOfflineFallback] = useState(false);

  // Xác định tâm mặc định (Hà Nội nếu phần lớn là Hà Nội, hoặc TP.HCM)
  const defaultCenter: [number, number] = center || (
    areas.length > 0 && areas[0].city === "hcm"
      ? [10.823, 106.68]
      : [21.028, 105.80]
  );

  // 1. Khởi tạo Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: defaultCenter,
        zoom: zoom,
        zoomControl: false,
        attributionControl: false,
      });

      // Thêm OpenStreetMap TileLayer với error handler
      const tileLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      });

      tileLayer.on("tileerror", () => {
        // Nếu không kết nối được tile OpenStreetMap, fallback sang chế độ đồ họa offline
        setOfflineFallback(true);
      });

      tileLayer.addTo(map);

      // Attribution
      L.control.attribution({ position: "bottomright", prefix: false }).addTo(map);
      // Zoom Control
      L.control.zoom({ position: "topright" }).addTo(map);

      // Layer groups
      heatmapLayerRef.current = L.layerGroup().addTo(map);
      amenitiesLayerRef.current = L.layerGroup().addTo(map);
      markersLayerRef.current = L.layerGroup().addTo(map);

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2. Cập nhật Center/Zoom khi props thay đổi
  useEffect(() => {
    if (mapInstanceRef.current && center) {
      mapInstanceRef.current.setView(center, zoom, { animate: true });
    }
  }, [center, zoom]);

  // 3. Vẽ Markers cho các khu vực
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();

    areas.forEach((area) => {
      const totalCost = calculateAreaTotalCost(area.rent.average, area.monthlyExpenses);
      const isSelected = selectedAreaId === area.id;

      // Tạo DivIcon không phụ thuộc ảnh ngoài
      const customIcon = L.divIcon({
        className: "custom-area-marker",
        html: `
          <div style="
            background: ${isSelected ? "#17324D" : "#16A36A"};
            color: #FFFFFF;
            padding: 4px 8px;
            border-radius: 9999px;
            font-size: 11px;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 4px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.25);
            border: 2px solid #FFFFFF;
            cursor: pointer;
            white-space: nowrap;
            transform: translate(-50%, -50%);
          ">
            <span>${area.name}</span>
            <span style="background: rgba(255,255,255,0.25); padding: 1px 5px; border-radius: 9999px; font-size: 10px;">
              ${area.rent.average} tr
            </span>
          </div>
        `,
        iconSize: [0, 0],
      });

      const marker = L.marker([area.latitude, area.longitude], { icon: customIcon });

      // Popup nội dung chi tiết
      const popupHtml = `
        <div style="padding: 4px; font-family: Inter, sans-serif; text-align: left; min-width: 180px;">
          <h4 style="margin: 0; font-size: 14px; font-weight: 700; color: #17324D;">${area.name} (${area.displayCity})</h4>
          <p style="margin: 4px 0 8px 0; font-size: 11px; color: #667085;">${area.description.slice(0, 80)}...</p>
          <div style="background: #F7F9FC; padding: 6px; border-radius: 8px; font-size: 11px; margin-bottom: 8px;">
            <div>Giá thuê TB: <b>${area.rent.average} triệu/tháng</b></div>
            <div>Tổng chi phí TB: <b style="color: #16A36A;">${totalCost} triệu/tháng</b></div>
            <div>An ninh: <b>${area.livingScores.safety}/5</b> | Ngập: <b>${area.livingScores.floodRisk}/5</b></div>
          </div>
          <a href="/areas/${area.slug}" style="
            display: block;
            text-align: center;
            background: #16A36A;
            color: #FFFFFF;
            padding: 6px 10px;
            border-radius: 8px;
            font-size: 11px;
            font-weight: 600;
            text-decoration: none;
          ">Xem chi tiết khu vực &rarr;</a>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on("click", () => {
        if (onSelectArea) {
          onSelectArea(area);
        }
      });

      markersLayer.addLayer(marker);

      if (isSelected) {
        marker.openPopup();
        map.panTo([area.latitude, area.longitude], { animate: true });
      }
    });
  }, [areas, selectedAreaId, onSelectArea]);

  // 4. Vẽ Heatmap Layer (Biểu diễn mật độ chi phí / môi trường)
  useEffect(() => {
    const map = mapInstanceRef.current;
    const heatLayer = heatmapLayerRef.current;
    if (!map || !heatLayer) return;

    heatLayer.clearLayers();

    if (!showHeatmap || areas.length === 0) return;

    areas.forEach((area) => {
      let intensity = 0.5; // Thang 0 - 1
      let color = "#16A36A";

      if (heatmapMode === "totalCost") {
        const total = calculateAreaTotalCost(area.rent.average, area.monthlyExpenses);
        intensity = Math.min(1.0, Math.max(0.2, (total - 7.5) / 4.0));
        color = intensity > 0.65 ? "#E45A5A" : intensity > 0.4 ? "#F5A623" : "#16A36A";
      } else if (heatmapMode === "rent") {
        intensity = Math.min(1.0, Math.max(0.2, (area.rent.average - 2.8) / 2.5));
        color = intensity > 0.65 ? "#E45A5A" : intensity > 0.4 ? "#F5A623" : "#16A36A";
      } else if (heatmapMode === "food") {
        intensity = Math.min(1.0, Math.max(0.2, (area.monthlyExpenses.food - 2.2) / 1.0));
        color = intensity > 0.6 ? "#F5A623" : "#16A36A";
      } else if (heatmapMode === "transport") {
        intensity = Math.min(1.0, Math.max(0.2, (area.monthlyExpenses.transportation - 0.7) / 0.4));
        color = "#3B82F6";
      } else if (heatmapMode === "environment") {
        intensity = (area.livingScores.environment + area.livingScores.safety) / 10;
        color = intensity > 0.8 ? "#16A36A" : "#F5A623";
      } else if (heatmapMode === "flood") {
        intensity = area.livingScores.floodRisk / 5.0;
        color = intensity > 0.6 ? "#E45A5A" : intensity > 0.4 ? "#F5A623" : "#3B82F6";
      }

      // Tạo Circle biểu thị bán kính nhiệt
      const circle = L.circle([area.latitude, area.longitude], {
        radius: 1200 + intensity * 600,
        fillColor: color,
        fillOpacity: 0.25 + intensity * 0.25,
        color: color,
        weight: 1,
        opacity: 0.6,
      });

      heatLayer.addLayer(circle);
    });
  }, [areas, heatmapMode, showHeatmap]);

  // 5. Vẽ Amenity Layer nếu được bật
  useEffect(() => {
    const amenitiesLayer = amenitiesLayerRef.current;
    if (!amenitiesLayer) return;

    amenitiesLayer.clearLayers();

    if (!showAmenities || amenities.length === 0) return;

    amenities.forEach((am) => {
      const amMarker = L.circleMarker([am.latitude, am.longitude], {
        radius: 6,
        fillColor: "#3B82F6",
        color: "#FFFFFF",
        weight: 2,
        fillOpacity: 0.9,
      });

      amMarker.bindTooltip(`${am.name} (${am.category})`, { direction: "top" });
      amenitiesLayer.addLayer(amMarker);
    });
  }, [showAmenities, amenities]);

  if (offlineFallback) {
    return (
      <OfflineMapFallback
        areas={areas}
        selectedAreaId={selectedAreaId}
        onSelectArea={onSelectArea}
        height={height}
      />
    );
  }

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden border border-border shadow-card ${className}`}>
      <div ref={mapContainerRef} style={{ height, width: "100%", zIndex: 1 }} />
      {showHeatmap && <MapLegend mode={heatmapMode} />}
    </div>
  );
};

export default LeafletMap;
