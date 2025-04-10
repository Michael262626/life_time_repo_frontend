import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

interface Account {
  id: string
  firstName: string
  lastName: string
  occupation: string
  imageUrl: string
}

interface AccountState {
  loading: boolean
  error: string | null
  success: boolean
  accounts: Account[]
}

const initialState: AccountState = {
  loading: false,
  error: null,
  success: false,
  accounts: []
}

// Create Account
export const createAccount = createAsyncThunk<
  Account,
  FormData,
  { rejectValue: string }
>(
  'account/create',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post<Account>(
        'http://localhost:3001/api/v1/accounts',
        formData
      )
      return response.data
    } catch (err: any) {
      return rejectWithValue(err.response?.data || 'Something went wrong')
    }
  }
)

// Fetch Account Holders
export const fetchAccountHolders = createAsyncThunk<
  Account[],
  void,
  { rejectValue: string }
>(
  'account/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Account[]>('http://localhost:3001/api/v1/accounts', {
        withCredentials: true,
      })
      return response.data
    } catch (err: any) {
      return rejectWithValue(err.response?.data || 'Something went wrong')
    }
  }
)

// Update Account
export const updateAccount = createAsyncThunk<
  Account,
  { id: string, data: { firstName: string; lastName: string; occupation: string } },
  { rejectValue: string }
>(
  'account/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put<Account>(
        `http://localhost:3001/api/v1/accounts/${id}`, 
        data // Send the data as JSON
      )
      return response.data
    } catch (err: any) {
      return rejectWithValue(err.response?.data || 'Something went wrong')
    }
  }
)


// Delete Account
export const deleteAccount = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  'account/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:3001/api/v1/accounts/${id}`)
      return id // Return the id of the deleted account
    } catch (err: any) {
      return rejectWithValue(err.response?.data || 'Something went wrong')
    }
  }
)

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    resetAccountState: (state) => {
      state.loading = false
      state.error = null
      state.success = false
      state.accounts = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = false
      })
      .addCase(createAccount.fulfilled, (state, action: PayloadAction<Account>) => {
        state.loading = false
        state.success = true
        state.accounts.push(action.payload)
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? 'An error occurred'
      })
      .addCase(fetchAccountHolders.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchAccountHolders.fulfilled, (state, action: PayloadAction<Account[]>) => {
        state.loading = false
        state.success = true
        state.accounts = action.payload
      })
      .addCase(fetchAccountHolders.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? 'An error occurred'
      })
      .addCase(updateAccount.pending, (state) => {
        state.loading = true
      })
      .addCase(updateAccount.fulfilled, (state, action: PayloadAction<Account>) => {
        state.loading = false
        state.success = true
        const index = state.accounts.findIndex(acc => acc.id === action.payload.id)
        if (index !== -1) {
          state.accounts[index] = action.payload
        }
      })
      .addCase(updateAccount.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? 'An error occurred'
      })
      .addCase(deleteAccount.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteAccount.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false
        state.success = true
        state.accounts = state.accounts.filter(acc => acc.id !== action.payload)
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? 'An error occurred'
      })
  }
})

export const { resetAccountState } = accountSlice.actions
export default accountSlice.reducer
