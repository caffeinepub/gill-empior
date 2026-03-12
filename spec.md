# GiLL EMPIOR

## Current State
New project, nothing built yet.

## Requested Changes (Diff)

### Add
- Product catalog with image, title, price, description (Amazon-style layout)
- Cart system: add/remove products, change quantity, real-time total update
- Checkout form: Name, Address, Mobile Number fields
- COD (Cash on Delivery) payment option
- Place Order flow: show success message, clear cart, log order data to backend
- Admin order storage: orders saved to backend canister for later retrieval
- Mobile-friendly UI using Inter font, Amazon-inspired design

### Modify
N/A

### Remove
N/A

## Implementation Plan
1. Backend: products list, order submission endpoint, order storage
2. Frontend: ProductGrid, CartDrawer, CheckoutForm, OrderSuccess components
3. Wire cart state globally, checkout submits to backend, success screen clears cart
