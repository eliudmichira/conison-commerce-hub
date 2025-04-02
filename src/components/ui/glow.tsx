import * as React from "react"
import { cn } from "@/lib/utils"

interface GlowProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "top" | "bottom" | "left" | "right" | "center"
}

export function Glow({
  variant = "center",
  className,
  ...props
}: GlowProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-0 overflow-hidden",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0 z-[-1] opacity-70 blur-[100px]",
          variant === "top" && "top-[-50%] translate-y-[-10%]",
          variant === "bottom" && "bottom-[-50%] translate-y-[10%]",
          variant === "left" && "left-[-50%] translate-x-[-10%]",
          variant === "right" && "right-[-50%] translate-x-[10%]",
          "bg-gradient-to-br from-conison-600/40 via-conison-700/30 to-conison-500/30"
        )}
      />
    </div>
  )
} 