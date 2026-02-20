"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Sale } from "@/types";
import { cn } from "@/lib/utils";

const gameColors: Record<string, string> = {
  pokemon: "bg-game-pokemon/20 text-game-pokemon border-game-pokemon/30",
  yugioh: "bg-game-yugioh/20 text-game-yugioh border-game-yugioh/30",
  riftbound: "bg-game-riftbound/20 text-game-riftbound border-game-riftbound/30",
};

interface RecentSalesTableProps {
  sales: Sale[];
  isLoading?: boolean;
}

export function RecentSalesTable({ sales, isLoading }: RecentSalesTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-xl border bg-card">
        <div className="p-4 border-b">
          <Skeleton className="h-5 w-32" />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Card</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead className="text-right">Profit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5].map((i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                <TableCell><Skeleton className="h-4 w-28" /></TableCell>
                <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                <TableCell><Skeleton className="h-4 w-14 ml-auto" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card">
      <div className="p-4 border-b">
        <h3 className="font-medium">Recent sales</h3>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Card</TableHead>
            <TableHead>Platform</TableHead>
            <TableHead className="text-right">Profit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sales.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                No sales yet
              </TableCell>
            </TableRow>
          ) : (
            sales.slice(0, 10).map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>{formatDate(sale.sale_date)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={cn("text-xs", gameColors[sale.game] ?? "")}
                    >
                      {sale.game}
                    </Badge>
                    <span className="truncate max-w-[140px]">{sale.card_name}</span>
                  </div>
                </TableCell>
                <TableCell>{sale.platform}</TableCell>
                <TableCell
                  className={cn(
                    "text-right font-medium",
                    sale.realized_profit >= 0 ? "text-profit" : "text-loss"
                  )}
                >
                  {formatCurrency(sale.realized_profit)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
