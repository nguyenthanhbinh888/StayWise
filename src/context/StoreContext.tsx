"use client";

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import { Area } from "@/types/area";
import { Contribution } from "@/types/contribution";
import { CalculatorInputs } from "@/types/calculator";
import { SEED_AREAS } from "@/data/areas";
import { SEED_CONTRIBUTIONS } from "@/data/contributions";
import { storageService } from "@/lib/storage/local-storage";

interface StoreContextType {
  isHydrated: boolean;
  areas: Area[];
  contributions: Contribution[];
  comparisonIds: string[];
  savedCalculatorPlan: CalculatorInputs | null;

  // Area Actions
  addArea: (area: Area) => void;
  updateArea: (id: string, updated: Partial<Area>) => void;
  deleteArea: (id: string) => void;
  resetAllData: () => void;

  // Contribution Actions
  submitContribution: (data: Omit<Contribution, "id" | "status" | "createdAt">) => Contribution;
  approveContribution: (id: string) => void;
  rejectContribution: (id: string) => void;

  // Comparison Actions
  toggleComparison: (areaId: string) => boolean; // returns true if added, false if removed
  isInComparison: (areaId: string) => boolean;
  removeComparison: (areaId: string) => void;
  clearComparison: () => void;

  // Calculator Actions
  savePlan: (plan: CalculatorInputs) => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [areas, setAreas] = useState<Area[]>(SEED_AREAS);
  const [contributions, setContributions] = useState<Contribution[]>(SEED_CONTRIBUTIONS);
  const [comparisonIds, setComparisonIds] = useState<string[]>(["cau-giay", "my-dinh"]);
  const [savedCalculatorPlan, setSavedCalculatorPlan] = useState<CalculatorInputs | null>(null);

  // Sync với LocalStorage sau khi mounted trên client
  useEffect(() => {
    try {
      const storedAreas = storageService.getAreas();
      const storedContributions = storageService.getContributions();
      const storedCompIds = storageService.getComparisonIds();
      const storedPlan = storageService.getSavedCalculatorPlan();

      setAreas(storedAreas);
      setContributions(storedContributions);
      setComparisonIds(storedCompIds);
      setSavedCalculatorPlan(storedPlan);
    } catch (e) {
      console.error("Lỗi khởi tạo Store:", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  const addArea = (newArea: Area) => {
    setAreas((prev) => {
      const next = [newArea, ...prev];
      storageService.saveAreas(next);
      return next;
    });
  };

  const updateArea = (id: string, updated: Partial<Area>) => {
    setAreas((prev) => {
      const next = prev.map((a) => (a.id === id ? { ...a, ...updated, updatedAt: new Date().toISOString() } : a));
      storageService.saveAreas(next);
      return next;
    });
  };

  const deleteArea = (id: string) => {
    setAreas((prev) => {
      const next = prev.filter((a) => a.id !== id);
      storageService.saveAreas(next);
      return next;
    });
    // Bỏ khỏi danh sách so sánh nếu có
    setComparisonIds((prev) => {
      const next = prev.filter((item) => item !== id);
      storageService.saveComparisonIds(next);
      return next;
    });
  };

  const resetAllData = () => {
    storageService.resetAll();
    setAreas(SEED_AREAS);
    setContributions(SEED_CONTRIBUTIONS);
    setComparisonIds(["cau-giay", "my-dinh"]);
    setSavedCalculatorPlan(null);
  };

  const submitContribution = (data: Omit<Contribution, "id" | "status" | "createdAt">): Contribution => {
    const newContribution: Contribution = {
      ...data,
      id: `ct-${Date.now()}`,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    setContributions((prev) => {
      const next = [newContribution, ...prev];
      storageService.saveContributions(next);
      return next;
    });

    return newContribution;
  };

  const approveContribution = (id: string) => {
    setContributions((prev) => {
      const next = prev.map((c) =>
        c.id === id ? { ...c, status: "approved" as const, updatedAt: new Date().toISOString() } : c
      );
      storageService.saveContributions(next);
      return next;
    });
  };

  const rejectContribution = (id: string) => {
    setContributions((prev) => {
      const next = prev.map((c) =>
        c.id === id ? { ...c, status: "rejected" as const, updatedAt: new Date().toISOString() } : c
      );
      storageService.saveContributions(next);
      return next;
    });
  };

  const toggleComparison = (areaId: string): boolean => {
    let added = false;
    setComparisonIds((prev) => {
      let next: string[];
      if (prev.includes(areaId)) {
        next = prev.filter((id) => id !== areaId);
        added = false;
      } else {
        if (prev.length >= 4) {
          // Tối đa 4 khu vực
          return prev;
        }
        next = [...prev, areaId];
        added = true;
      }
      storageService.saveComparisonIds(next);
      return next;
    });
    return added;
  };

  const isInComparison = useCallback(
    (areaId: string): boolean => {
      return comparisonIds.includes(areaId);
    },
    [comparisonIds]
  );

  const removeComparison = (areaId: string) => {
    setComparisonIds((prev) => {
      const next = prev.filter((id) => id !== areaId);
      storageService.saveComparisonIds(next);
      return next;
    });
  };

  const clearComparison = () => {
    setComparisonIds([]);
    storageService.saveComparisonIds([]);
  };

  const savePlan = (plan: CalculatorInputs) => {
    setSavedCalculatorPlan(plan);
    storageService.saveCalculatorPlan(plan);
  };

  const value = useMemo(
    () => ({
      isHydrated,
      areas,
      contributions,
      comparisonIds,
      savedCalculatorPlan,
      addArea,
      updateArea,
      deleteArea,
      resetAllData,
      submitContribution,
      approveContribution,
      rejectContribution,
      toggleComparison,
      isInComparison,
      removeComparison,
      clearComparison,
      savePlan,
    }),
    [isHydrated, areas, contributions, comparisonIds, savedCalculatorPlan, isInComparison]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
