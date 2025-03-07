"use client"

import { format, subDays, startOfWeek, endOfWeek, startOfMonth } from "date-fns"
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DateRangeDropdownProps {
  className?: string
  dateRange: DateRange | undefined
  onDateRangeChange: (range: DateRange | undefined) => void
}

export function DateRangeDropdown({
  className,
  dateRange,
  onDateRangeChange,
}: DateRangeDropdownProps) {
  const today = new Date()

  const presets = {
    today: {
      label: "Today",
      range: { from: today, to: today }
    },
    yesterday: {
      label: "Yesterday",
      range: {
        from: subDays(today, 1),
        to: subDays(today, 1)
      }
    },
    thisWeek: {
      label: "This Week",
      range: {
        from: startOfWeek(today, { weekStartsOn: 1 }),
        to: today
      }
    },
    lastWeek: {
      label: "Last Week",
      range: {
        from: startOfWeek(subDays(today, 7), { weekStartsOn: 1 }),
        to: endOfWeek(subDays(today, 7), { weekStartsOn: 1 })
      }
    },
    thisMonth: {
      label: "This Month",
      range: {
        from: startOfMonth(today),
        to: today
      }
    }
  }

  const formatDateRange = (range: DateRange | undefined) => {
    if (!range?.from) return "Select date range"

    if (range.to) {
      if (format(range.from, "yyyy-MM-dd") === format(range.to, "yyyy-MM-dd")) {
        return format(range.from, "MMMM d, yyyy")
      }
      return `${format(range.from, "MMM d, yyyy")} - ${format(range.to, "MMM d, yyyy")}`
    }

    return format(range.from, "MMMM d, yyyy")
  }

  return (
    <div className={cn("relative", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !dateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>{formatDateRange(dateRange)}</span>
            <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[240px] p-0">
          {Object.entries(presets).map(([key, { label, range }]) => (
            <DropdownMenuItem
              key={key}
              className="cursor-pointer px-4 py-2 hover:bg-accent"
              onClick={() => onDateRangeChange(range)}
            >
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
} 