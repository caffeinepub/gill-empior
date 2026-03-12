import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Order {
    id: bigint;
    customerName: string;
    address: string;
    timestamp: bigint;
    mobile: string;
    products: Array<Product>;
}
export interface Product {
    id: bigint;
    title: string;
    quantity: bigint;
    price: bigint;
}
export interface backendInterface {
    deleteOrder(id: bigint): Promise<void>;
    getAllOrders(): Promise<Array<Order>>;
    getOrderById(id: bigint): Promise<Order>;
    submitOrder(customerName: string, address: string, mobile: string, products: Array<Product>): Promise<void>;
}
