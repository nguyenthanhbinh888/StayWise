import React from "react";
import { AreaReview } from "@/types/review";
import { formatDateVN } from "@/lib/formatting/date";
import { Star, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/common/Badge";

export const ReviewCard: React.FC<{ review: AreaReview }> = ({ review }) => {
  return (
    <div className="bg-white rounded-2xl border border-border p-5 shadow-card text-left space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <h4 className="text-sm font-bold text-navy">{review.authorName}</h4>
            <Badge variant="success" size="sm" className="gap-1 text-[10px]">
              <ShieldCheck className="w-3 h-3" /> Đã xác thực
            </Badge>
          </div>
          <span className="text-[11px] text-textMuted mt-0.5 block">
            {formatDateVN(review.createdAt)}
          </span>
        </div>
        <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-lg border border-amber-200">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-bold">{review.overallRating}</span>
        </div>
      </div>

      <p className="text-xs text-textSecondary leading-relaxed">{review.content}</p>

      {/* Chi tiết điểm số */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-border/50 text-[11px] text-textMuted">
        <div>An ninh: <span className="font-semibold text-navy">{review.securityRating}/5</span></div>
        <div>Yên tĩnh: <span className="font-semibold text-navy">{review.quietnessRating}/5</span></div>
        <div>Giao thông: <span className="font-semibold text-navy">{review.trafficRating}/5</span></div>
        <div>Ngập lụt: <span className="font-semibold text-navy">{review.floodingRating}/5</span></div>
      </div>
    </div>
  );
};
