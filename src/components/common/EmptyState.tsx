import React from "react";
import { LucideIcon, Search } from "lucide-react";
import { Button } from "./Button";

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon: Icon = Search,
  actionText,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-2xl border border-dashed border-border my-4">
      <div className="w-12 h-12 rounded-full bg-navy-light/60 text-navy flex items-center justify-center mb-3">
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="text-base font-bold text-navy">{title}</h4>
      <p className="text-xs text-textSecondary max-w-sm mt-1 mb-4 leading-relaxed">{description}</p>
      {actionText && onAction && (
        <Button size="sm" variant="outline" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};
