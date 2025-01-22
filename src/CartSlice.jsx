import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addItem: (state, action) => {
        const { name, image, cost } = action.payload;
        const existingItem = state.items.find(item => item.name === name);
        if (existingItem) {
          existingItem.quantity++;
        } else {
          state.items.push({ name, image, cost, quantity: 1 });
        }
        state.totalQuantity++;
      },
    removeItem: (state, action) => {
        const { name, quantity } = action.payload;
        const item =  state.items.find(item => item.name === name);
        // console.log(action.payload.name)
        // state.items = state.items.filter(item => item.name !== action.payload.name);
        if(item) {
            state.totalQuantity -= item.quantity;
            state.items = state.items.filter(item => item.name !== action.payload.name);
        }
    },
    updateQuantity: (state, action) => {
        const { name, quantity } = action.payload;
        const itemToUpdate = state.items.find(item => item.name === name);
        if (itemToUpdate) {
          itemToUpdate.quantity = quantity;
          const diff = quantity - itemToUpdate.quantity;
          state.totalQuantity += diff;
        }
    
    },
  },
});

export const { addItem, removeItem, updateQuantity, totalQuantity } = CartSlice.actions;

export default CartSlice.reducer;
