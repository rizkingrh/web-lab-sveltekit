import type { ColumnDef } from "@tanstack/table-core";
import { renderComponent } from "$lib/components/ui/data-table";
import DataTableActions from "./data-table-actions.svelte";
import { Checkbox } from "$lib/components/ui/checkbox";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Praktikum = {
    id: string;
    nama_praktikum: string;
    nama_lab: string;
    semester: string;
};

export const columns: ColumnDef<Praktikum>[] = [
    {
        id: "select",
        header: ({ table }) =>
            renderComponent(Checkbox, {
                checked: table.getIsAllPageRowsSelected(),
                indeterminate:
                    table.getIsSomePageRowsSelected() &&
                    !table.getIsAllPageRowsSelected(),
                onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
                "aria-label": "Select all",
            }),
        cell: ({ row }) =>
            renderComponent(Checkbox, {
                checked: row.getIsSelected(),
                onCheckedChange: (value) => row.toggleSelected(!!value),
                "aria-label": "Select row",
            }),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: "Kode Praktikum",
        cell: ({ row }) => {
            return row.original.id.toUpperCase();
        },
    },
    {
        accessorKey: "nama_praktikum",
        header: "Nama Praktikum",
    },
    {
        accessorKey: "nama_lab",
        header: "Laboratorium",
    },
    {
        accessorKey: "semester",
        header: "Semester",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            // You can pass whatever you need from `row.original` to the component
            return renderComponent(DataTableActions, { id: row.original.id });
        },
    },
];