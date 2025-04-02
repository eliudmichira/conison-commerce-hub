import * as React from "react"
import { cn } from "@/lib/utils"

interface MockupProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "responsive" | "browser" | "phone"
  children: React.ReactNode
}

export function Mockup({ 
  type = "responsive", 
  className, 
  children, 
  ...props 
}: MockupProps) {
  return (
    <div 
      className={cn(
        "w-full overflow-hidden rounded-lg border bg-background shadow-lg",
        type === "browser" && "rounded-t-lg",
        type === "phone" && "max-w-[320px] rounded-[2rem] border-[8px] border-muted p-2",
        className
      )} 
      {...props}
    >
      {type === "browser" && (
        <div className="flex items-center border-b bg-muted/40 px-4 py-2">
          <div className="flex space-x-2">
            <div className="h-2 w-2 rounded-full bg-red-500"></div>
            <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
          </div>
          <div className="mx-auto text-xs text-muted-foreground">example.com</div>
        </div>
      )}
      {children}
    </div>
  )
}

interface MockupFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "small" | "medium" | "large"
  children: React.ReactNode
}

export function MockupFrame({
  size = "medium",
  className,
  children,
  ...props
}: MockupFrameProps) {
  return (
    <div
      className={cn(
        "relative w-full max-w-screen-lg overflow-hidden rounded-lg border bg-background p-4 shadow-xl",
        size === "small" && "max-w-screen-sm",
        size === "medium" && "max-w-screen-md",
        size === "large" && "max-w-screen-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
} 