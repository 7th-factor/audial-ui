# Search Pages & Dialog Standardization

## Overview
All search/list pages must use the DataTable component pattern OR SearchAndFilter + CardGrid pattern.
All dialogs must use react-hook-form with Zod validation.

---

## Available Patterns

### 1. DataTable Pattern (for table layouts)
Located in `components/data-table/`:
- `data-table.tsx` - Main reusable DataTable component
- `data-table-toolbar.tsx` - Search input + faceted filters
- `data-table-faceted-filter.tsx` - Multi-select filter dropdowns
- `data-table-pagination.tsx` - Pagination controls
- `data-table-column-header.tsx` - Sortable column headers

### 2. CardGrid Pattern (for card layouts)
Located in `components/shared/`:
- `search-and-filter.tsx` - Search + faceted filters for cards (uses TanStack Table filtering)
- `card-grid-pagination.tsx` - Pagination for card grids
- `selectable-card.tsx` - Card wrapper with selection capability

---

## Page Status

### ✅ COMPLETED

| Page | Location | Implementation |
|------|----------|----------------|
| **Team** | `/settings/team` | DataTable with faceted filters (role, status), InviteMemberDialog with react-hook-form + Zod |
| **Phone Numbers** | `/settings/phone-numbers` | SearchAndFilter + CardGrid pattern with CardGridPagination |
| **Contacts** | `/contacts` | DataTable ✓ |
| **Inbox** | `/inbox` | DataTable ✓ |
| **Follow Ups** | `/follow-ups` | DataTable ✓ |
| **API Keys** | `/api-keys` | DataTable ✓ |

### FORMS/DIALOGS Status

| Dialog/Form | Location | Status |
|-------------|----------|--------|
| Team Member Invite | `/settings/team` | ✅ InviteMemberDialog with react-hook-form + Zod |
| Phone Number Create | `/settings/phone-numbers` | ⏳ TODO |
| Account Settings Form | `/settings/account` | ⏳ Placeholder |

---

## Component Files Created

### Team DataTable
- `components/data-table/team/schema.ts` - TeamMember Zod schema
- `components/data-table/team/data.ts` - Roles/statuses with icons
- `components/data-table/team/columns.tsx` - Column definitions
- `components/data-table/team/row-actions.tsx` - Row action dropdown
- `components/settings/invite-member-dialog.tsx` - Invite dialog

### Card Grid Components
- `components/shared/search-and-filter.tsx` - Reusable search + filters
- `components/shared/card-grid-pagination.tsx` - Card grid pagination
- `components/shared/selectable-card.tsx` - Selectable card wrapper

---

## Usage Examples

### DataTable with Faceted Filters
```tsx
<DataTable
  columns={columns}
  data={data}
  searchColumnId="name"
  searchPlaceholder="Search..."
  facetedFilters={[
    { columnId: "role", title: "Role", options: roles },
    { columnId: "status", title: "Status", options: statuses },
  ]}
/>
```

### SearchAndFilter for Card Grids
```tsx
<SearchAndFilter
  data={items}
  searchColumn="name"
  searchPlaceholder="Search..."
  filters={[
    { column: "status", title: "Status", options: statusOptions },
  ]}
  onFilteredDataChange={setFilteredData}
/>

<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
  {paginatedData.map((item) => (
    <ItemCard key={item.id} item={item} />
  ))}
</div>

<CardGridPagination
  totalItems={filteredData.length}
  pageSize={pageSize}
  currentPage={currentPage}
  onPageChange={handlePageChange}
  onPageSizeChange={handlePageSizeChange}
/>
```

### Dialog with react-hook-form + Zod
```tsx
const schema = z.object({
  email: z.string().email("Invalid email"),
  role: z.enum(["admin", "member", "viewer"]),
})

const form = useForm<z.infer<typeof schema>>({
  resolver: zodResolver(schema),
  defaultValues: { email: "", role: "member" },
})
```
