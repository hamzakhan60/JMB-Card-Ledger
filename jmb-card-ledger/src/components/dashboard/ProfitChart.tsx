"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/utils";
import { motion } from "motion/react";

interface DataPoint {
  date: string;
  profit: number;
}

interface ProfitChartProps {
  data: DataPoint[];
  isLoading?: boolean;
  title?: string;
}

export function ProfitChart({
  data,
  isLoading,
  title = "Profit over time",
}: ProfitChartProps) {
  if (isLoading) {
    return (
      <Card className="p-6">
        <Skeleton className="h-6 w-40 mb-4" />
        <Skeleton className="h-64 w-full" />
      </Card>
    );
  }

  const maxProfit = Math.max(...data.map((d) => d.profit), 1);
  const minProfit = Math.min(...data.map((d) => d.profit), 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="p-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">
          {title}
        </h3>
        <div className="h-64 flex items-end gap-1">
          {data.length === 0 ? (
            <p className="text-sm text-muted-foreground">No data</p>
          ) : (
            data.map((point, i) => {
              const height =
                maxProfit === minProfit
                  ? 20
                  : ((point.profit - minProfit) / (maxProfit - minProfit)) * 100;
              const isNegative = point.profit < 0;
              return (
                <motion.div
                  key={point.date}
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.max(height, 4)}%` }}
                  transition={{ delay: i * 0.02, duration: 0.3 }}
                  className="flex-1 min-w-[4px] rounded-t bg-primary/80 hover:bg-primary"
                  style={{
                    backgroundColor: isNegative
                      ? "var(--loss)"
                      : "var(--profit)",
                  }}
                  title={`${point.date}: ${formatCurrency(point.profit)}`}
                />
              );
            })
          )}
        </div>
        {data.length > 0 && (
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>{data[0]?.date}</span>
            <span>{data[data.length - 1]?.date}</span>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
