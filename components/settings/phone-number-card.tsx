'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IconDotsVertical, IconPencil, IconTrash } from '@tabler/icons-react';

export interface PhoneNumber {
  id: string;
  number: string;
  countryCode: string;
  label: string;
}

interface PhoneNumberCardProps {
  phoneNumber: PhoneNumber;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

// Country code to flag emoji mapping
const countryFlags: Record<string, string> = {
  US: '🇺🇸',
  GB: '🇬🇧',
  CA: '🇨🇦',
  AU: '🇦🇺',
  DE: '🇩🇪',
  FR: '🇫🇷',
  ES: '🇪🇸',
  IT: '🇮🇹',
  MX: '🇲🇽',
  BR: '🇧🇷',
  IN: '🇮🇳',
  JP: '🇯🇵',
};

export function PhoneNumberCard({
  phoneNumber,
  onEdit,
  onDelete,
}: PhoneNumberCardProps) {
  const flag = countryFlags[phoneNumber.countryCode] || '🌐';

  return (
    <div className="relative flex flex-col rounded-xl border bg-card p-5 shadow-sm transition hover:shadow-md">
      {/* More Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 h-8 w-8 text-muted-foreground"
          >
            <IconDotsVertical className="h-4 w-4" />
            <span className="sr-only">More options</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onEdit?.(phoneNumber.id)}>
            <IconPencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onDelete?.(phoneNumber.id)}
            className="text-destructive"
          >
            <IconTrash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Flag */}
      <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-muted/50 text-xl mb-4">
        {flag}
      </div>

      {/* Phone Number */}
      <div className="text-base font-medium text-foreground mb-4">{phoneNumber.number}</div>

      {/* Label */}
      <div className="mt-auto">
        <span className="text-sm text-muted-foreground">{phoneNumber.label}</span>
      </div>
    </div>
  );
}
