import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import brandServices from "./brandServices";

export const getBrands = createAsyncThunk(
  "brand/get-brands",
  async (thunkAPI) => {
    try {
      return await brandServices.getBrands();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getSingleBrand = createAsyncThunk(
  "brand/get-brand",
  async (id, thunkAPI) => {
    try {
      return await brandServices.getSingleBrand(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createBrand = createAsyncThunk(
  "brand/create-brand",
  async (brandData, thunkAPI) => {
    try {
        console.log(brandData)
      return await brandServices.createBrand(brandData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateBrand = createAsyncThunk(
  "brand/update-brand",
  async (brand, thunkAPI) => {
    try {
      return await brandServices.updateBrand(brand);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteBrand = createAsyncThunk(
  "brand/delete-brand",
  async (id, thunkAPI) => {
    try {
      console.log(id)
      return await brandServices.deleteBrand(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetStateBrand = createAction("Reset_all");

const initialState = {
  brands: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "", 
};
export const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.brands = action.payload.brands;
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdBrand = action.payload;
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getSingleBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.brandName = action.payload.brand.name;
      })
      .addCase(getSingleBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedBrand = action.payload;
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        console.log(action.error)
        state.message = action.error;
      })
      .addCase(deleteBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedBrand = action.payload;
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetStateBrand, () => initialState);
  },
});

export default brandSlice.reducer;
