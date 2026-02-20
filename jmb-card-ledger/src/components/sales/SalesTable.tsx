"use client";

import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useSales } from "@/lib/query/sales";
import type { Sale, SaleFilters } from "@/types";
import { cn } from "@/lib/utils";
import { Pencil, FileText } from "lucide-react";

const gameColors: Record<string, string> = {
  pokemon: "bg-game-pokemon/20 text-game-pokemon border-game-pokemon/30",
  yugioh: "bg-game-yugioh/20 text-game-yugioh border-game-yugioh/30",
  riftbound: "bg-game-riftbound/20 text-game-riftbound border-game-riftbound/30",
};

interface SalesTableProps {
  filters: SaleFilters;
  onEdit?: (sale: Sale) => void;
  onFIFOAudit?: (saleId: string) => void;
}

export function SalesTable({
  filters,
  onEdit,
  onFIFOAudit,
}: SalesTableProps) {
  const { data, isLoading } = useSales(filters);

  const columns: DataTableColumn<Sale>[] = [
    {
      id: "sale_date",
      header: "Date",
      cell: (row) => formatDate(row.sale_date),
    },
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
          <span className="truncate max-w-[120px]">{row.card_name}</span>
        </div>
      ),
    },
    {
      id: "platform",
      header: "Platform",
      cell: (row) => row.platform,
    },
    {
      id: "qty_sold",
      header: "Qty",
      cell: (row) => row.qty_sold,
    },
    {
      id: "net_proceeds",
      header: "Net",
      cell: (row) => formatCurrency(row.net_proceeds),
    },
    {
      id: "realized_profit",
      header: "Profit",
      cell: (row) => (
        <span
          className={cn(
            "font-medium",
            row.realized_profit >= 0 ? "text-profit" : "text-loss"
          )}
        >
          {formatCurrency(row.realized_profit)}
        </span>
      ),
    },
    ...(onEdit || onFIFOAudit
      ? [
          {
            id: "actions",
            header: "",
            cell: (row: Sale) => (
              <div className="flex gap-1">
                {onFIFOAudit && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onFIFOAudit(row.id)}
                    aria-label="FIFO audit"
                  >
                    <FileText className="size-4" />
                  </Button>
                )}
                {onEdit && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(row)}
                    aria-label="Edit"
                  >
                    <Pencil className="size-4" />
                  </Button>
                )}
              </div>
            ),
          } as DataTableColumn<Sale>,
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
      emptyMessage="No sales yet. Record a sale to see it here."
    />
  );
}
