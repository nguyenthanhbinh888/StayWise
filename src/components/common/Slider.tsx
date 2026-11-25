import React from "react";
import { cn } from "@/lib/utils";

export interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  valueDisplay?: string | number;
  min: number;
  max: number;
  step?: number;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, label, valueDisplay, min, max, step = 1, id, ...props }, ref) => {
    const sliderId = id || props.name;

    return (
      <div className="w-full space-y-2">
        {(label || valueDisplay !== undefined) && (
          <div className="flex justify-between items-center text-xs">
            {label && <label htmlFor={sliderId} className="font-semibold text-textPrimary">{label}</label>}
            {valueDisplay !== undefined && (
              <span className="font-bold text-primary px-2 py-0.5 bg-primary-light rounded-md">
                {valueDisplay}
              </span>
            )}
          </div>
        )}
        <input
          id={sliderId}
          ref={ref}
          type="range"
          min={min}
          max={max}
          step={step}
          className={cn(
            "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary",
            className
          )}
          {...props}
        />
        <div className="flex justify-between text-[11px] text-textMuted px-0.5">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
    );
  }
);
Slider.displayName = "Slider";
