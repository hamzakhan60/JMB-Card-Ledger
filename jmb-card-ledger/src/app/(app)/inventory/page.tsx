"use client";

import { useState } from "react";
import { InventoryTable } from "@/components/inventory/InventoryTable";
import { AddLotDrawer } from "@/components/inventory/AddLotDrawer";
import { EditLotDrawer } from "@/components/inventory/EditLotDrawer";
import { LotDetailPanel } from "@/components/inventory/LotDetailPanel";
import type { InventoryLot } from "@/types";
import type { InventoryFilters } from "@/types";
import { motion } from "motion/react";

export default function InventoryPage() {
  const [filters, setFilters] = useState<InventoryFilters>({
    page: 1,
    pageSize: 25,
  });
  const [editingLot, setEditingLot] = useState<InventoryLot | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  function handleEdit(lot: InventoryLot) {
    setEditingLot(lot);
    setEditOpen(true);
  }

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold">Inventory</h1>
          <p className="text-muted-foreground text-sm">
            Manage your card lots and quantities.
          </p>
        </div>
        <AddLotDrawer />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <InventoryTable filters={filters} onEdit={handleEdit} />
        </div>
        <div>
          <LotDetailPanel lot={editingLot} />
        </div>
      </div>

      <EditLotDrawer
        lot={editingLot}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
    </div>
  );
}
