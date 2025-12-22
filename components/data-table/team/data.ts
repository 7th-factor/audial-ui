import {
  IconCrown,
  IconShield,
  IconUser,
  IconEye,
  IconCircleCheck,
  IconClock,
  IconCircleX,
} from "@tabler/icons-react"

export const roles = [
  {
    value: "owner",
    label: "Owner",
    icon: IconCrown,
  },
  {
    value: "admin",
    label: "Admin",
    icon: IconShield,
  },
  {
    value: "member",
    label: "Member",
    icon: IconUser,
  },
  {
    value: "viewer",
    label: "Viewer",
    icon: IconEye,
  },
]

export const statuses = [
  {
    value: "active",
    label: "Active",
    icon: IconCircleCheck,
  },
  {
    value: "pending",
    label: "Pending",
    icon: IconClock,
  },
  {
    value: "inactive",
    label: "Inactive",
    icon: IconCircleX,
  },
]
