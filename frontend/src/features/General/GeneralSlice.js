import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { _getData } from './GeneralApi'

const initialState = {
    general: null,
    status: "idle"
}

export const getData = createAsyncThunk(
    'general/getData',
    async () => {
        const response = await _getData()
        return response
    }
)

export const generalReducer = createSlice({
    name: 'general',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getData.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getData.fulfilled, (state, action) => {
                state.status = 'fulfilled'
                state.general = action.payload
            })
    },
})

export default generalReducer.reducer