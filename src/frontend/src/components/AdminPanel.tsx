import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useActor } from "@/hooks/useActor";
import { useGetAllOrders } from "@/hooks/useQueries";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Loader2, Package, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface AdminPanelProps {
  onBack: () => void;
}

export function AdminPanel({ onBack }: AdminPanelProps) {
  const { data: orders, isLoading } = useGetAllOrders();
  const { actor } = useActor();
  const queryClient = useQueryClient();

  const handleDelete = async (id: bigint) => {
    if (!actor) return;
    try {
      await actor.deleteOrder(id);
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order deleted");
    } catch {
      toast.error("Failed to delete order");
    }
  };

  const formatTime = (ts: bigint) => {
    const ms = Number(ts) / 1_000_000;
    return new Date(ms).toLocaleString("en-IN");
  };

  return (
    <div data-ocid="admin.panel" className="max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-black text-2xl text-foreground">
            Admin Panel
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            All placed orders — {orders?.length ?? 0} total
          </p>
        </div>
        <Button
          data-ocid="admin.back_button"
          onClick={onBack}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Store
        </Button>
      </div>

      {/* Loading */}
      {isLoading && (
        <div
          data-ocid="admin.loading_state"
          className="flex items-center justify-center py-20"
        >
          <Loader2 className="w-8 h-8 animate-spin text-amazon-orange" />
        </div>
      )}

      {/* Empty */}
      {!isLoading && (!orders || orders.length === 0) && (
        <div
          data-ocid="admin.empty_state"
          className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3"
        >
          <Package className="w-16 h-16 opacity-20" />
          <p className="font-semibold text-lg">No orders yet</p>
          <p className="text-sm">
            Orders will appear here once customers place them
          </p>
        </div>
      )}

      {/* Orders table */}
      {!isLoading && orders && orders.length > 0 && (
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-bold">#</TableHead>
                <TableHead className="font-bold">Customer</TableHead>
                <TableHead className="font-bold">Mobile</TableHead>
                <TableHead className="font-bold">Address</TableHead>
                <TableHead className="font-bold">Items</TableHead>
                <TableHead className="font-bold">Total</TableHead>
                <TableHead className="font-bold">Time</TableHead>
                <TableHead className="font-bold">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order, index) => {
                const total = order.products.reduce(
                  (sum, p) => sum + Number(p.price) * Number(p.quantity),
                  0,
                );
                return (
                  <TableRow
                    key={String(order.id)}
                    data-ocid={`admin.order.row.${index + 1}`}
                    className="hover:bg-muted/30"
                  >
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      #{String(order.id).slice(-4)}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {order.customerName}
                    </TableCell>
                    <TableCell>{order.mobile}</TableCell>
                    <TableCell className="max-w-[150px] truncate text-sm">
                      {order.address}
                    </TableCell>
                    <TableCell>
                      <span className="bg-amazon-orange/10 text-amazon-orange text-xs font-bold px-2 py-0.5 rounded-full">
                        {order.products.length} item
                        {order.products.length !== 1 ? "s" : ""}
                      </span>
                    </TableCell>
                    <TableCell className="font-bold">
                      ₹{total.toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {formatTime(order.timestamp)}
                    </TableCell>
                    <TableCell>
                      <button
                        type="button"
                        data-ocid={`admin.order.delete_button.${index + 1}`}
                        onClick={() => handleDelete(order.id)}
                        className="p-1.5 text-destructive hover:bg-destructive/10 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
