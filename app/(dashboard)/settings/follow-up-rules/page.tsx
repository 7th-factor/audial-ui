"use client"

import { useState } from "react"
import { MoreHorizontal } from "lucide-react"
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
import {
  AddRuleDialog,
  mockFollowUpRules,
  followUpActions,
  type FollowUpRule,
} from "@/components/follow-ups"
import { toast } from "sonner"

export default function FollowUpRulesPage() {
  const [rules, setRules] = useState(mockFollowUpRules)
  const [showAddDialog, setShowAddDialog] = useState(false)

  const handleToggle = (ruleId: string, enabled: boolean) => {
    setRules((prev) =>
      prev.map((rule) =>
        rule.id === ruleId ? { ...rule, enabled } : rule
      )
    )
    toast.success(enabled ? "Rule enabled" : "Rule disabled")
  }

  const handleEdit = (rule: FollowUpRule) => {
    // TODO: Implement edit functionality
    console.log("Edit rule:", rule)
    toast.info("Edit functionality coming soon")
  }

  const handleDelete = (ruleId: string) => {
    setRules((prev) => prev.filter((rule) => rule.id !== ruleId))
    toast.success("Rule deleted")
  }

  const getActionLabel = (actionValue: string) => {
    const action = followUpActions.find((a) => a.value === actionValue)
    return action?.label || actionValue
  }

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">When should follow ups be created ?</h2>
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
              <TableHead className="w-[40%]">Condition</TableHead>
              <TableHead>Action to do</TableHead>
              <TableHead className="w-[120px]">Toggle on/off</TableHead>
              <TableHead className="w-[50px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rules.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
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
                  <TableCell>
                    <Switch
                      checked={rule.enabled}
                      onCheckedChange={(checked) => handleToggle(rule.id, checked)}
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
        onSuccess={() => {
          // Refresh data when API is connected
        }}
      />
    </div>
  )
}
