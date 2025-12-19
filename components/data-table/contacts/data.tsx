import {
  IconUserCheck,
  IconUserX,
  IconUserPause,
  IconStar,
  IconBriefcase,
  IconRocket,
  IconUsers,
  IconBuildingSkyscraper,
} from "@tabler/icons-react"

export const statuses = [
  {
    value: "active",
    label: "Active",
    icon: IconUserCheck,
  },
  {
    value: "inactive",
    label: "Inactive",
    icon: IconUserX,
  },
  {
    value: "pending",
    label: "Pending",
    icon: IconUserPause,
  },
  {
    value: "vip",
    label: "VIP",
    icon: IconStar,
  },
]

export const tags = [
  {
    value: "customer",
    label: "Customer",
    icon: IconUsers,
  },
  {
    value: "partner",
    label: "Partner",
    icon: IconBriefcase,
  },
  {
    value: "lead",
    label: "Lead",
    icon: IconRocket,
  },
  {
    value: "enterprise",
    label: "Enterprise",
    icon: IconBuildingSkyscraper,
  },
]
