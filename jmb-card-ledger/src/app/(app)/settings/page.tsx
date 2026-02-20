"use client";

import { useProfile } from "@/lib/query/profile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";

export default function SettingsPage() {
  const { data: profile, isLoading } = useProfile();

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground text-sm">
          Account and subscription settings.
        </p>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-6 w-48" />
          ) : (
            <p className="text-sm">
              <span className="text-muted-foreground">Email:</span>{" "}
              {profile?.email ?? "—"}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
