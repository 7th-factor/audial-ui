import { IconKey, IconKeyOff, IconClock, IconShield, IconEye, IconPencil, IconTrash } from "@tabler/icons-react"

export const statuses = [
  {
    value: "active",
    label: "Active",
    icon: IconKey,
  },
  {
    value: "revoked",
    label: "Revoked",
    icon: IconKeyOff,
  },
  {
    value: "expired",
    label: "Expired",
    icon: IconClock,
  },
]

export const permissions = [
  {
    value: "read",
    label: "Read",
    icon: IconEye,
  },
  {
    value: "write",
    label: "Write",
    icon: IconPencil,
  },
  {
    value: "delete",
    label: "Delete",
    icon: IconTrash,
  },
  {
    value: "admin",
    label: "Admin",
    icon: IconShield,
  },
]
