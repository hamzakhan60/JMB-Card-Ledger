"use client";

import { useState } from "react";
import { SalesTable } from "@/components/sales/SalesTable";
import { RecordSaleDrawer } from "@/components/sales/RecordSaleDrawer";
import { FIFOAuditModal } from "@/components/sales/FIFOAuditModal";
import type { SaleFilters } from "@/types";
import { motion } from "motion/react";

export default function SalesPage() {
  const [filters, setFilters] = useState<SaleFilters>({
    page: 1,
    pageSize: 25,
  });
  const [fifoAuditSaleId, setFifoAuditSaleId] = useState<string | null>(null);
  const [fifoAuditOpen, setFifoAuditOpen] = useState(false);

  function handleFIFOAudit(saleId: string) {
    setFifoAuditSaleId(saleId);
    setFifoAuditOpen(true);
  }

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold">Sales</h1>
          <p className="text-muted-foreground text-sm">
            Record sales and view FIFO profit.
          </p>
        </div>
        <RecordSaleDrawer />
      </motion.div>

      <SalesTable
        filters={filters}
        onFIFOAudit={handleFIFOAudit}
      />

      <FIFOAuditModal
        saleId={fifoAuditSaleId}
        open={fifoAuditOpen}
        onOpenChange={setFifoAuditOpen}
      />
    </div>
  );
}
