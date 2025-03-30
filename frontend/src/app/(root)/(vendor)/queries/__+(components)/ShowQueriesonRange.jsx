"use client"

import * as React from "react" 
import { Calendar as CalendarIcon } from "lucide-react" 

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import  moment  from 'moment'
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function ShowQueriesonRange({
  className,
  date, setDate
}) {
  

  return (
    <div className={cn("w-full", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full  justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                {moment(date.from).format('LLL')} -{" "}
                {moment(date.to).format("LLL")}
                  {/* {format(date.from, "LLL dd, y")} 
                  {format(date.to, "LLL dd, y")} */}
                </>
              ) : (
                moment(date.from).format("LLL")
                // format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
