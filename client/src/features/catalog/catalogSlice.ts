import { createEntityAdapter, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";
import { RootState } from "../../app/store/configureStore";

const productsAdapter = createEntityAdapter<Product>();

export const fetchProductsAsync = createAsyncThunk<Product[]>(
    'catalog/fetchProductsAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.Catalog.list();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchProductAsync = createAsyncThunk<Product, number>(
    'catalog/fetchProductAsync',
    async (productId, thunkAPI) => {
        try {
            return await agent.Catalog.details(productId);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productsAdapter.getInitialState({
        productsLoaded: false,
        status: 'idle'
    }),
    reducers: {},
    extraReducers: (builder => {
        builder
            .addCase(fetchProductsAsync.pending, (state) => {
                state.status = 'pendingFecthProducts';
            })
            .addCase(fetchProductsAsync.fulfilled, (state, action) => {
                productsAdapter.setAll(state, action.payload);
                state.status = 'idle';
                state.productsLoaded = true;
            })
            .addCase(fetchProductsAsync.rejected, (state, action) => {
                console.log(action.payload);
                state.status = 'idle';
            })

            .addCase(fetchProductAsync.pending, (state) => {
                state.status = 'pendingFecthProduct';
            })
            .addCase(fetchProductAsync.fulfilled, (state, action) => {
                productsAdapter.upsertOne(state, action.payload);
                state.status = 'idle';
            })
            .addCase(fetchProductAsync.rejected, (state, action) => {
                console.log(action);
                state.status = 'idle';
            });
    })
});

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog);