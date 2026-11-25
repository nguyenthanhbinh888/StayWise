import React from "react";
import { AmenityItem } from "@/types/amenity";
import {
  Utensils,
  Coffee,
  ShoppingCart,
  Store,
  GraduationCap,
  Hospital,
  Bus,
  Pill,
} from "lucide-react";

export const AmenityCard: React.FC<{ item: AmenityItem }> = ({ item }) => {
  const getIcon = () => {
    switch (item.category) {
      case "restaurant":
        return <Utensils className="w-4 h-4 text-primary" />;
      case "affordableFood":
        return <Coffee className="w-4 h-4 text-amber-600" />;
      case "supermarket":
        return <ShoppingCart className="w-4 h-4 text-blue-600" />;
      case "market":
        return <Store className="w-4 h-4 text-emerald-700" />;
      case "school":
        return <GraduationCap className="w-4 h-4 text-purple-600" />;
      case "hospital":
        return <Hospital className="w-4 h-4 text-danger" />;
      case "busStop":
        return <Bus className="w-4 h-4 text-navy" />;
      case "pharmacy":
        return <Pill className="w-4 h-4 text-teal-600" />;
      default:
        return <Store className="w-4 h-4 text-textSecondary" />;
    }
  };

  return (
    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-background border border-border/60 hover:bg-white transition-all text-left">
      <div className="w-8 h-8 rounded-lg bg-white border border-border flex items-center justify-center shrink-0">
        {getIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <h5 className="text-xs font-bold text-navy truncate">{item.name}</h5>
        <p className="text-[11px] text-textSecondary mt-0.5 line-clamp-1">{item.description}</p>
        {item.distanceKm && (
          <span className="text-[10px] text-textMuted mt-1 block">
            Khoảng cách: ~{item.distanceKm} km
          </span>
        )}
      </div>
    </div>
  );
};
