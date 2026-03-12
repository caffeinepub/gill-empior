import { useMutation, useQuery } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useGetAllOrders() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllOrders();
    },
    enabled: !!actor && !isFetching,
  });
}

export interface SubmitOrderParams {
  customerName: string;
  address: string;
  mobile: string;
  products: Array<{
    id: number;
    title: string;
    price: number;
    quantity: number;
  }>;
}

export function useSubmitOrder() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (params: SubmitOrderParams) => {
      if (!actor) throw new Error("Actor not available");
      const backendProducts = params.products.map((p) => ({
        id: BigInt(p.id),
        title: p.title,
        price: BigInt(p.price),
        quantity: BigInt(p.quantity),
      }));
      await actor.submitOrder(
        params.customerName,
        params.address,
        params.mobile,
        backendProducts,
      );
    },
  });
}
