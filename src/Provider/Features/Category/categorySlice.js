import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import CategoryService from "./categoryServices";

export const getCategories = createAsyncThunk(
  "productCategory/get-categories",
  async (thunkAPI) => {
    try {
      return await CategoryService.getCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createCategory = createAsyncThunk(
  "productCategory/create-category",
  async (categoryData, thunkAPI) => {
    try {
      return await CategoryService.createCategory(categoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateCategory = createAsyncThunk(
  "productCategory/update-category",
  async (categoryData, thunkAPI) => {
    try {
      return await CategoryService.updateCategory(categoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteCategory = createAsyncThunk(
  "productCategory/delete-category",
  async (id, thunkAPI) => {
    try {
      return await CategoryService.deleteCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getSingleCategory = createAsyncThunk(
  "productCategory/get-single-category",
  async (id, thunkAPI) => {
    try {
      return await CategoryService.getSingleCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetStateCategory = createAction("RevertAll");

const initialState = {
  Categories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const CategorySlice = createSlice({
  name: "Categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    //   ---reading---
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.Categories = action.payload.categories;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
    //   ---reading---
    //   ---create---
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdCategory = action.payload;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
    //   ---create---
    //   ---update---
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedCategory = action.payload;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
    //   ---update---
    //   ---delete---
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCategory = action.payload;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
    //   ---delete---
    //   ---getSingleCategory---
      .addCase(getSingleCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categoryName = action.payload.category.name;
      })
      .addCase(getSingleCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
    //   ---getSingleCategory---
      .addCase(resetStateCategory, () => initialState);
  },
});
export default CategorySlice.reducer;
