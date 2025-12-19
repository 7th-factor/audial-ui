import {
  IconMail,
  IconMailOpened,
  IconStar,
  IconArchive,
  IconTrash,
  IconTag,
  IconBriefcase,
  IconUser,
  IconBell,
} from "@tabler/icons-react"

export const statuses = [
  {
    value: "unread",
    label: "Unread",
    icon: IconMail,
  },
  {
    value: "read",
    label: "Read",
    icon: IconMailOpened,
  },
  {
    value: "starred",
    label: "Starred",
    icon: IconStar,
  },
  {
    value: "archived",
    label: "Archived",
    icon: IconArchive,
  },
  {
    value: "trash",
    label: "Trash",
    icon: IconTrash,
  },
]

export const labels = [
  {
    value: "work",
    label: "Work",
    icon: IconBriefcase,
  },
  {
    value: "personal",
    label: "Personal",
    icon: IconUser,
  },
  {
    value: "important",
    label: "Important",
    icon: IconBell,
  },
  {
    value: "other",
    label: "Other",
    icon: IconTag,
  },
]
