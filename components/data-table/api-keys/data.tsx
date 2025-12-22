import { IconKey, IconKeyOff, IconClock, IconShield, IconEye, IconPencil, IconTrash, IconWorld, IconLock } from "@tabler/icons-react"

export const keyTypes = [
  {
    value: "public",
    label: "Public",
    icon: IconWorld,
    description: "For client-side use in web widgets and browser applications",
  },
  {
    value: "private",
    label: "Private",
    icon: IconLock,
    description: "For server-side use with full API access",
  },
]

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
