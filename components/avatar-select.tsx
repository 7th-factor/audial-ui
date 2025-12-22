'use client'

import { useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'

interface AvatarOption {
  value: string
  label: string
  image: string
}

interface AvatarSelectProps<T extends FieldValues> {
  form: UseFormReturn<T>
  fieldName: Path<T>
  avatarOptions: AvatarOption[]
  label?: string
}

export function AvatarSelect<T extends FieldValues>({
  form,
  fieldName,
  avatarOptions,
  label = 'Agent Avatar',
}: AvatarSelectProps<T>) {
  const [open, setOpen] = useState(false)

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => {
        const selectedAvatar =
          avatarOptions.find((option) => option.value === field.value) || avatarOptions[0]

        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-start bg-transparent"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-5 h-5 rounded-full overflow-hidden bg-muted flex-shrink-0">
                        {selectedAvatar?.image && (
                          <img
                            src={selectedAvatar.image}
                            alt={selectedAvatar.label}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {selectedAvatar?.label || 'Select an Avatar'}
                      </span>
                    </div>
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandList>
                    <CommandEmpty>No avatar found.</CommandEmpty>
                    <CommandGroup>
                      {avatarOptions.map((option) => (
                        <CommandItem
                          key={option.value}
                          value={option.value}
                          onSelect={() => {
                            field.onChange(option.value)
                            setOpen(false)
                          }}
                          className="flex items-center gap-3 p-3"
                        >
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-muted flex-shrink-0">
                            <img
                              src={option.image}
                              alt={option.label}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="flex-1">{option.label}</span>
                          <Check
                            className={cn(
                              'ml-auto h-4 w-4',
                              field.value === option.value ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
