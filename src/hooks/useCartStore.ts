import { create } from "zustand";
import { currentCart } from "@wix/ecom";
import { WixClient } from "@/context/wixContext";

type CartState = {
  cart: currentCart.Cart;
  isLoading: boolean;
  counter: number;
  getCart: (wixClient: WixClient) => void;
  addItem: (
    wixClient: WixClient,
    productId: string,
    variantId: string,
    quantity: number
  ) => void;
  removeItem: (wixClient: WixClient, itemId: string) => void;
  clearCart: (wixClient: WixClient) => void; // ✅ Added
};

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  isLoading: true,
  counter: 0,

  getCart: async (wixClient) => {
    try {
      const cart = await wixClient.currentCart.getCurrentCart();
      set({
        cart: cart || [],
        isLoading: false,
        counter: cart?.lineItems?.length || 0,
      });
    } catch (err) {
      set((prev) => ({ ...prev, isLoading: false }));
    }
  },

  addItem: async (wixClient, productId, variantId, quantity) => {
    set((state) => ({ ...state, isLoading: true }));
    const response = await wixClient.currentCart.addToCurrentCart({
      lineItems: [
        {
          catalogReference: {
            appId: process.env.NEXT_PUBLIC_WIX_APP_ID!,
            catalogItemId: productId,
            ...(variantId && { options: { variantId } }),
          },
          quantity: quantity,
        },
      ],
    });

    set({
      cart: response.cart,
      counter: response.cart?.lineItems?.length ?? 0,
      isLoading: false,
    });
  },

  removeItem: async (wixClient, itemId) => {
    set((state) => ({ ...state, isLoading: true }));
    const response = await wixClient.currentCart.removeLineItemsFromCurrentCart([itemId]);
    set({
      cart: response.cart,
      counter: response.cart?.lineItems?.length ?? 0,
      isLoading: false,
    });
  },

  clearCart: async (wixClient) => {
    set({ isLoading: true });
    const currentCart = await wixClient.currentCart.getCurrentCart();
    const lineItemIds = currentCart?.lineItems?.map((item: any) => item._id) || [];
    let response;
    if (lineItemIds.length > 0) {
      response = await wixClient.currentCart.removeLineItemsFromCurrentCart(lineItemIds);
    } else {
      response = { cart: currentCart };
    }
    set({
      cart: response.cart,
      counter: 0,
      isLoading: false,
    });
  },
}));
