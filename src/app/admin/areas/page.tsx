"use client";

import React, { useState } from "react";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { AreaEditModal } from "@/components/forms/AreaEditModal";
import { ConfirmationDialog } from "@/components/common/ConfirmationDialog";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { Badge } from "@/components/common/Badge";
import { useStore } from "@/hooks/useStore";
import { useToast } from "@/hooks/useToast";
import { Area } from "@/types/area";
import { calculateAreaTotalCost } from "@/lib/calculations/cost";
import { formatCurrencyMillion } from "@/lib/formatting/currency";
import { Plus, Search, Edit2, Trash2, RotateCcw, MapPin } from "lucide-react";

export default function AdminAreasPage() {
  const { areas, addArea, updateArea, deleteArea, resetAllData } = useStore();
  const { success, error: toastError } = useToast();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>("all");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [areaToEdit, setAreaToEdit] = useState<Area | null>(null);

  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const filteredAreas = areas.filter((a) => {
    if (selectedCity !== "all" && a.city !== selectedCity) return false;
    if (searchQuery.trim() && !a.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleOpenAddModal = () => {
    setAreaToEdit(null);
    setIsEditModalOpen(true);
  };

  const handleOpenEditModal = (area: Area) => {
    setAreaToEdit(area);
    setIsEditModalOpen(true);
  };

  const handleSaveArea = (data: Partial<Area>) => {
    if (areaToEdit) {
      updateArea(areaToEdit.id, data);
      success("Đã cập nhật khu vực!", `Thông tin của ${data.name || areaToEdit.name} đã được lưu.`);
    } else {
      const newArea: Area = {
        id: data.slug || `area-${Date.now()}`,
        slug: data.slug || `area-${Date.now()}`,
        name: data.name || "Khu vực mới",
        city: data.city || "hanoi",
        displayCity: data.displayCity || "Hà Nội",
        latitude: data.latitude || 21.028,
        longitude: data.longitude || 105.8,
        rent: data.rent || { min: 3.0, max: 5.0, average: 4.0 },
        monthlyExpenses: data.monthlyExpenses || { food: 2.5, transportation: 0.8, utilities: 0.65, other: 1.0 },
        livingScores: data.livingScores || { safety: 4, quietness: 4, trafficConvenience: 4, environment: 4, floodRisk: 2 },
        amenities: { restaurants: 20, affordableFood: 20, supermarkets: 5, markets: 5, schools: 8, hospitals: 2, busStops: 10, pharmacies: 10, convenienceStores: 15 },
        description: data.description || "Khu vực mới bổ sung từ bảng quản trị.",
        highlights: ["Khu vực mới được thêm vào hệ thống"],
        updatedAt: new Date().toISOString(),
      };
      addArea(newArea);
      success("Đã thêm khu vực mới!", `Khu vực ${newArea.name} đã sẵn sàng xuất hiện.`);
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteTargetId) {
      deleteArea(deleteTargetId);
      success("Đã xóa khu vực!", "Khu vực đã được gỡ khỏi danh sách quản lý.");
      setDeleteTargetId(null);
    }
  };

  const handleResetConfirm = () => {
    resetAllData();
    success("Đã khôi phục dữ liệu gốc!", "Toàn bộ 10 khu vực đã được đưa về cấu hình ban đầu.");
  };

  return (
    <div className="flex-1 flex flex-col text-left">
      <AdminHeader
        title="Quản lý Danh mục Khu vực"
        subtitle="Thêm mới, chỉnh sửa thông số chi phí hoặc xóa khu vực khảo sát"
      />

      <main className="p-6 lg:p-8 space-y-6 max-w-7xl">
        {/* Top Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <Input
              placeholder="Tìm kiếm khu vực theo tên..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-white rounded-xl border border-border px-3 py-2 text-xs font-semibold text-navy focus:outline-none"
            >
              <option value="all">Tất cả TP</option>
              <option value="hanoi">Hà Nội</option>
              <option value="hcm">TP.HCM</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsResetConfirmOpen(true)}
              className="text-xs gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Khôi phục Seed Data
            </Button>
            <Button size="sm" onClick={handleOpenAddModal} className="text-xs gap-1.5">
              <Plus className="w-3.5 h-3.5" /> Thêm khu vực mới
            </Button>
          </div>
        </div>

        {/* Table List */}
        <div className="bg-white rounded-3xl border border-border shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-background border-b border-border text-textSecondary uppercase tracking-wider font-semibold">
                  <th className="p-4 text-left">Khu vực</th>
                  <th className="p-4 text-left">Thành phố</th>
                  <th className="p-4 text-center">Tọa độ (Lat, Lng)</th>
                  <th className="p-4 text-center">Giá thuê TB</th>
                  <th className="p-4 text-center">Tổng chi phí TB</th>
                  <th className="p-4 text-center">An ninh / Ngập</th>
                  <th className="p-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-navy">
                {filteredAreas.map((area) => {
                  const total = calculateAreaTotalCost(area.rent.average, area.monthlyExpenses);

                  return (
                    <tr key={area.id} className="hover:bg-background/60 transition-colors">
                      <td className="p-4 font-bold">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-primary" />
                          <span>{area.name}</span>
                        </div>
                        <span className="text-[10px] text-textMuted font-normal">{area.slug}</span>
                      </td>
                      <td className="p-4">
                        <Badge variant={area.city === "hanoi" ? "secondary" : "info"} size="sm">
                          {area.displayCity}
                        </Badge>
                      </td>
                      <td className="p-4 text-center text-textMuted font-mono text-[11px]">
                        {area.latitude.toFixed(3)}, {area.longitude.toFixed(3)}
                      </td>
                      <td className="p-4 text-center font-bold">
                        {formatCurrencyMillion(area.rent.average)}
                      </td>
                      <td className="p-4 text-center font-extrabold text-primary">
                        {formatCurrencyMillion(total)}
                      </td>
                      <td className="p-4 text-center">
                        <span className="text-primary font-semibold">{area.livingScores.safety}</span> /{" "}
                        <span className="text-danger font-semibold">{area.livingScores.floodRisk}</span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleOpenEditModal(area)}
                            className="p-1.5 rounded-lg text-textSecondary hover:bg-navy-light hover:text-navy transition-colors"
                            title="Chỉnh sửa"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteTargetId(area.id)}
                            className="p-1.5 rounded-lg text-textMuted hover:bg-danger-light hover:text-danger transition-colors"
                            title="Xóa khu vực"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Thêm/Sửa */}
        <AreaEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          areaToEdit={areaToEdit}
          onSave={handleSaveArea}
        />

        {/* Dialog Xác nhận Xóa */}
        <ConfirmationDialog
          isOpen={!!deleteTargetId}
          onClose={() => setDeleteTargetId(null)}
          onConfirm={handleDeleteConfirm}
          title="Xác nhận xóa khu vực"
          message="Bạn có chắc chắn muốn xóa khu vực này khỏi hệ thống? Thao tác sẽ cập nhật dữ liệu lưu trữ trên trình duyệt."
          confirmText="Xóa khu vực"
          isDestructive={true}
        />

        {/* Dialog Xác nhận Reset */}
        <ConfirmationDialog
          isOpen={isResetConfirmOpen}
          onClose={() => setIsResetConfirmOpen(false)}
          onConfirm={handleResetConfirm}
          title="Khôi phục dữ liệu ban đầu"
          message="Toàn bộ khu vực và đóng góp sẽ được làm mới về bộ dữ liệu mẫu mặc định 10 khu vực. Bạn có chắc chắn muốn tiếp tục?"
          confirmText="Khôi phục"
          isDestructive={true}
        />
      </main>
    </div>
  );
}
