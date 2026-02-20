"use client";

import { useState } from "react";
import { useDashboardStats } from "@/lib/query/dashboard";
import { useSales } from "@/lib/query/sales";
import { KPICard } from "@/components/dashboard/KPICard";
import { ProfitChart } from "@/components/dashboard/ProfitChart";
import { RecentSalesTable } from "@/components/dashboard/RecentSalesTable";
import { TrendingUp, Package, DollarSign } from "lucide-react";
import { motion } from "motion/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function DashboardPage() {
  const [period, setPeriod] = useState<"7d" | "30d" | "90d">("30d");
  const { data: stats, isLoading: statsLoading } = useDashboardStats(period);
  const { data: salesData } = useSales({ page: 1, pageSize: 10 });

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground text-sm">
          Overview of your card business.
        </p>
      </motion.div>

      <Tabs
        value={period}
        onValueChange={(v) => setPeriod(v as "7d" | "30d" | "90d")}
      >
        <TabsList>
          <TabsTrigger value="7d">7 days</TabsTrigger>
          <TabsTrigger value="30d">30 days</TabsTrigger>
          <TabsTrigger value="90d">90 days</TabsTrigger>
        </TabsList>
        <TabsContent value={period} className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              title="Total profit"
              value={stats?.total_profit ?? 0}
              icon={TrendingUp}
              trend={
                (stats?.total_profit ?? 0) >= 0 ? "up" : "down"
              }
              isLoading={statsLoading}
            />
            <KPICard
              title="Total revenue"
              value={stats?.total_revenue ?? 0}
              icon={DollarSign}
              isLoading={statsLoading}
            />
            <KPICard
              title="Total fees"
              value={stats?.total_fees ?? 0}
              icon={DollarSign}
              isLoading={statsLoading}
            />
            <KPICard
              title="Cards on hand"
              value={stats?.cards_on_hand ?? 0}
              icon={Package}
              isLoading={statsLoading}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <ProfitChart
              data={stats?.profit_by_period ?? []}
              isLoading={statsLoading}
            />
            <RecentSalesTable
              sales={salesData?.data ?? []}
              isLoading={statsLoading}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
