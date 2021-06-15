import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { _login, _register, _updateUser, _getUser } from './userAPI'

const initialState = {
    currentUser: null,
    allUsers: [],
    loginStatus: "idle",
    registerStatus: "idle",
    updateStatus: "idle",
    getStatus: "idle",
}

export const login = createAsyncThunk(
    'user/login',
    async (user, { rejectWithValue }) => {
        const response = await _login(user)
        if (response.code !== undefined) return rejectWithValue(response)
        return response
    }
)

export const register = createAsyncThunk(
    'user/register',
    async (user, { rejectWithValue }) => {
        const response = await _register(user)
        if (response.code !== undefined) return rejectWithValue(response)
        return response
    }
)

export const updateUser = createAsyncThunk(
    'user/update',
    async (user, { rejectWithValue }) => {
        const response = await _updateUser(user)
        if (response.code !== undefined) return rejectWithValue(response)
        return response
    }
)

export const getUser = createAsyncThunk(
    'user/read',
    async (user, { rejectWithValue }) => {
        const response = await _getUser(user)
        if (response.code !== undefined) return rejectWithValue(response)
        return response
    }
)

export const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.currentUser = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loginStatus = 'loading'
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loginStatus = 'fulfilled'
                state.currentUser = action.payload.user
                if (typeof state.allUsers !== typeof []) state.allUsers = []
                state.allUsers = [...state.allUsers, action.payload.user]
            })
            .addCase(login.rejected, (state, action) => {
                state.loginStatus = 'error'
                state.loginError = action.payload.message
            })

            .addCase(register.pending, (state) => {
                state.registerStatus = 'loading'
            })
            .addCase(register.fulfilled, (state, action) => {
                state.registerStatus = 'fulfilled'
                state.currentUser = action.payload.user
                if (typeof state.allUsers !== typeof []) state.allUsers = []
                state.allUsers = [...state.allUsers, action.payload.user]
            })
            .addCase(register.rejected, (state, action) => {
                state.registerStatus = 'error'
                state.registerError = action.payload?.message
            })

            .addCase(updateUser.pending, (state) => {
                state.updateStatus = 'loading'
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.updateStatus = 'fulfilled'
                if (typeof state.allUsers !== typeof []) state.allUsers = []
                state.currentUser = action.payload.user
                state.allUsers = state.allUsers.filter(user => user._id !== action.payload.user._id).push(action.payload.user)
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.updateStatus = 'error'
                state.updateError = action.payload.message
            })

            .addCase(getUser.pending, (state) => {
                state.getStatus = 'loading'
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.getStatus = 'fulfilled'
                if (typeof state.allUsers !== typeof []) state.allUsers = []
                if (action.payload.users !== undefined) state.allUsers = action.payload.users
                else state.allUsers = [...state.allUsers?.filter(user => user._id !== action.payload.user._id), action.payload.user] 
            })
            .addCase(getUser.rejected, (state, action) => {
                state.getStatus = 'error'
                state.updateError = action.payload?.message
            })
    },
})
export const { logout } = userReducer.actions
export default userReducer.reducer
