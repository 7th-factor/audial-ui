'use client';

import * as React from 'react';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import type { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { AnalyticsDateRange, DateRangePreset } from '@/lib/analytics/types';
import { DATE_RANGE_PRESETS } from '@/lib/analytics/types';
import { getDateRangeFromPreset } from '@/lib/analytics/fake-data-generator';

interface DateRangePickerProps {
  dateRange: AnalyticsDateRange;
  onDateRangeChange: (range: AnalyticsDateRange) => void;
  className?: string;
}

export function DateRangePicker({ dateRange, onDateRangeChange, className }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedRange, setSelectedRange] = React.useState<DateRange | undefined>({
    from: dateRange.from,
    to: dateRange.to,
  });

  // Update local state when prop changes
  React.useEffect(() => {
    setSelectedRange({
      from: dateRange.from,
      to: dateRange.to,
    });
  }, [dateRange]);

  const handlePresetClick = (preset: DateRangePreset) => {
    const newRange = getDateRangeFromPreset(preset as 'today' | '7d' | '30d' | '90d');
    onDateRangeChange(newRange);
    setIsOpen(false);
  };

  const handleSelect = (range: DateRange | undefined) => {
    setSelectedRange(range);
    if (range?.from && range?.to) {
      onDateRangeChange({
        from: range.from,
        to: range.to,
        preset: 'custom',
      });
    }
  };

  const handleApply = () => {
    if (selectedRange?.from && selectedRange?.to) {
      onDateRangeChange({
        from: selectedRange.from,
        to: selectedRange.to,
        preset: 'custom',
      });
      setIsOpen(false);
    }
  };

  const getDisplayText = () => {
    if (dateRange.preset && dateRange.preset !== 'custom') {
      const preset = DATE_RANGE_PRESETS.find((p) => p.value === dateRange.preset);
      return preset?.label || 'Select date range';
    }
    if (dateRange.from && dateRange.to) {
      return `${format(dateRange.from, 'MMM d, yyyy')} - ${format(dateRange.to, 'MMM d, yyyy')}`;
    }
    return 'Select date range';
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'justify-start text-left font-normal min-w-[240px]',
            !dateRange && 'text-muted-foreground',
            className
          )}
          data-testid="date-range-picker"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {getDisplayText()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex">
          {/* Presets sidebar */}
          <div className="flex flex-col border rounded-lg bg-muted/50 m-2 p-2 space-y-1">
            <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">
              Quick Select
            </div>
            {DATE_RANGE_PRESETS.map((preset) => (
              <Button
                key={preset.value}
                variant={dateRange.preset === preset.value ? 'secondary' : 'ghost'}
                size="sm"
                className="justify-start"
                onClick={() => handlePresetClick(preset.value)}
                data-testid={`date-preset-${preset.value}`}
              >
                {preset.label}
              </Button>
            ))}
          </div>

          {/* Calendar */}
          <div className="p-2">
            <Calendar
              mode="range"
              defaultMonth={dateRange.from}
              selected={selectedRange}
              onSelect={handleSelect}
              numberOfMonths={2}
              disabled={{ after: new Date() }}
            />
            <div className="flex items-center justify-between border-t p-2 mt-2">
              <div className="text-sm text-muted-foreground">
                {selectedRange?.from && selectedRange?.to ? (
                  <>
                    {format(selectedRange.from, 'MMM d')} -{' '}
                    {format(selectedRange.to, 'MMM d, yyyy')}
                  </>
                ) : (
                  'Select a range'
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleApply}
                  disabled={!selectedRange?.from || !selectedRange?.to}
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
