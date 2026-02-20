"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RecordSaleSchema,
  type RecordSalePayload,
} from "@/lib/validators/sales";
import { useRecordSale } from "@/lib/query/sales";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useState } from "react";

const GAMES = ["pokemon", "yugioh", "riftbound"] as const;
const CONDITIONS = ["NM", "LP", "MP", "HP", "DMG"] as const;

export function RecordSaleDrawer() {
  const [open, setOpen] = useState(false);
  const recordSale = useRecordSale();

  const form = useForm<RecordSalePayload>({
    resolver: zodResolver(RecordSaleSchema),
    defaultValues: {
      sale_date: new Date().toISOString().split("T")[0],
      platform: "",
      card_name: "",
      game: "pokemon",
      set_name: "",
      variant: "",
      condition: "NM",
      qty_sold: 1,
      sale_price_each: 0,
      platform_fee: 0,
      processing_fee: 0,
      shipping_cost: 0,
      other_fees: 0,
    },
  });

  async function onSubmit(values: RecordSalePayload) {
    await recordSale.mutateAsync(values);
    form.reset();
    setOpen(false);
  }

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerTrigger asChild>
        <Button>
          <Plus className="size-4 mr-2" />
          Record sale
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-w-[480px] w-full ml-auto">
        <DrawerHeader>
          <DrawerTitle>Record sale</DrawerTitle>
        </DrawerHeader>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 px-4 pb-4"
        >
          <Form {...form}>
            <FormField
              control={form.control}
              name="sale_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sale date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="platform"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Platform</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. eBay, TCGPlayer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="game"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Game</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {GAMES.map((g) => (
                        <SelectItem key={g} value={g}>
                          {g}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="card_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="set_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Set name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="condition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Condition</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CONDITIONS.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="qty_sold"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Qty sold</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sale_price_each"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sale price each ($)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      step={0.01}
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="platform_fee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Platform fee ($)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      step={0.01}
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="processing_fee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Processing fee ($)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      step={0.01}
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
          <DrawerFooter>
            <Button type="submit" disabled={recordSale.isPending}>
              Record sale
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
