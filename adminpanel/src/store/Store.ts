import { configureStore } from "@reduxjs/toolkit";
import AdminSlice from './AdminSlice.ts';
export const store = configureStore({
    reducer:{
        AdminSlice:AdminSlice
    }
});