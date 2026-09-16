import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stars({ value = 5, className }: { value?: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} aria-label={`${value} de 5 estrelas`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn(
            "size-4",
            i <= Math.round(value) ? "fill-highlight text-highlight" : "text-border",
          )}
        />
      ))}
    </span>
  );
}
