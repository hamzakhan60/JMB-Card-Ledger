"use client";

import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useInventoryLots } from "@/lib/query/inventory";
import type { InventoryLot, InventoryFilters } from "@/types";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";

const gameColors: Record<string, string> = {
  pokemon: "bg-game-pokemon/20 text-game-pokemon border-game-pokemon/30",
  yugioh: "bg-game-yugioh/20 text-game-yugioh border-game-yugioh/30",
  riftbound: "bg-game-riftbound/20 text-game-riftbound border-game-riftbound/30",
};

interface InventoryTableProps {
  filters: InventoryFilters;
  onEdit?: (lot: InventoryLot) => void;
}

export function InventoryTable({ filters, onEdit }: InventoryTableProps) {
  const { data, isLoading } = useInventoryLots(filters);

  const columns: DataTableColumn<InventoryLot>[] = [
    {
      id: "card_name",
      header: "Card",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={cn("text-xs", gameColors[row.game] ?? "")}
          >
            {row.game}
          </Badge>
          <span className="font-medium">{row.card_name}</span>
        </div>
      ),
    },
    {
      id: "set_name",
      header: "Set",
      cell: (row) => row.set_name,
    },
    {
      id: "condition",
      header: "Condition",
      cell: (row) => row.condition,
    },
    {
      id: "qty",
      header: "Qty",
      cell: (row) => `${row.qty_on_hand} / ${row.qty_initial}`,
    },
    {
      id: "cost",
      header: "Cost",
      cell: (row) => formatCurrency(row.cost_per_card),
    },
    {
      id: "purchase_date",
      header: "Purchase",
      cell: (row) => formatDate(row.purchase_date),
    },
    ...(onEdit
      ? [
          {
            id: "actions",
            header: "",
            cell: (row: InventoryLot) => (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(row)}
                aria-label="Edit"
              >
                <Pencil className="size-4" />
              </Button>
            ),
          } as DataTableColumn<InventoryLot>,
        ]
      : []),
  ];

  return (
    <DataTable
      columns={columns}
      data={data?.data ?? []}
      keyExtractor={(row) => row.id}
      page={data?.page ?? 1}
      pageSize={data?.pageSize ?? 25}
      totalCount={data?.totalCount ?? 0}
      onPageChange={() => {}}
      isLoading={isLoading}
      emptyMessage="No inventory lots. Add your first lot to get started."
    />
  );
}
