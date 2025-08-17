"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@app/lib/utils";
import { Button } from "@app/components/ui/button";
import { Calendar } from "@app/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@app/components/ui/popover";

interface DatePickerProps {
  onChange: (date: string) => void;
  defaultValue?: Date;
}

export function DatePicker({ onChange, defaultValue }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(defaultValue);

  const handleChangeSelect = (date: Date | undefined) => {
    if (date) {
      setDate(date);
      onChange(date.toISOString());
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon />
          {date ? format(date, "dd-MM-yyyy") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleChangeSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
