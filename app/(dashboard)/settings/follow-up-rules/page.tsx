"use client"

import { Check, MoreHorizontal } from "lucide-react"
import { IconPlus } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import {
  AddRuleDialog,
  EditRuleDialog,
  followUpActions,
  followUpPriorities,
  formatDueTimeOnly,
} from "@/components/follow-ups"
import {
  useFollowUpRules,
  useUpdateFollowUpRule,
  useDeleteFollowUpRule,
} from "@/lib/features/follow-ups"
import type { FollowUpRule } from "@/lib/api/types/follow-up"
import { useState } from "react"

export default function FollowUpRulesPage() {
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [selectedRule, setSelectedRule] = useState<FollowUpRule | null>(null)

  // Fetch rules from API
  const { data: rulesResponse, isLoading } = useFollowUpRules()
  const updateRule = useUpdateFollowUpRule()
  const deleteRule = useDeleteFollowUpRule()

  const rules = rulesResponse?.data || []

  const handleToggle = (ruleId: string, active: boolean) => {
    updateRule.mutate({
      id: ruleId,
      data: { active },
    })
  }

  const handleEdit = (rule: FollowUpRule) => {
    setSelectedRule(rule)
    setShowEditDialog(true)
  }

  const handleDelete = (ruleId: string) => {
    deleteRule.mutate(ruleId)
  }

  const getActionLabel = (actionValue: string) => {
    const action = followUpActions.find((a) => a.value === actionValue)
    return action?.label || actionValue
  }

  const getPriorityLabel = (priorityValue: string) => {
    const priority = followUpPriorities.find((p) => p.value === priorityValue)
    return priority?.label || priorityValue
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Skeleton className="h-6 w-64" />
            <Skeleton className="h-4 w-96 mt-2" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">When should follow ups be created?</h2>
          <p className="text-sm text-muted-foreground">
            Define rules to automatically create follow-ups based on call conditions.
          </p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <IconPlus className="mr-2 h-4 w-4" />
          Add new Rule
        </Button>
      </div>

      {/* Rules Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[25%]">Condition</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Due Time</TableHead>
              <TableHead className="text-center">Business Hours</TableHead>
              <TableHead className="w-[120px]">Toggle on/off</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rules.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <p className="text-muted-foreground">No rules configured.</p>
                  <Button
                    variant="link"
                    className="mt-2"
                    onClick={() => setShowAddDialog(true)}
                  >
                    Add your first rule
                  </Button>
                </TableCell>
              </TableRow>
            ) : (
              rules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell className="font-medium">{rule.condition}</TableCell>
                  <TableCell>{getActionLabel(rule.action)}</TableCell>
                  <TableCell>{getPriorityLabel(rule.priority)}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDueTimeOnly(rule.dueTime)}
                  </TableCell>
                  <TableCell className="text-center">
                    {rule.dueTime.business && (
                      <Check className="h-4 w-4 mx-auto text-green-600" />
                    )}
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={rule.active}
                      onCheckedChange={(checked) => handleToggle(rule.id, checked)}
                      disabled={updateRule.isPending}
                      data-testid={`rule-toggle-${rule.id}`}
                    />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          data-testid={`rule-actions-${rule.id}`}
                        >
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(rule)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDelete(rule.id)}
                          className="text-destructive"
                          disabled={deleteRule.isPending}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add Rule Dialog */}
      <AddRuleDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />

      {/* Edit Rule Dialog */}
      <EditRuleDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        rule={selectedRule}
      />
    </div>
  )
}
