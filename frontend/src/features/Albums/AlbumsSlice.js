import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { _createAlbum, _getAlbum, _createTrack, _getTrack, _createContent, _getContent } from './AlbumsAPI'

const initialState = {
    albums: [],
    createAlbumStatus: "idle",
    createAlbumError: "",
    getAlbumStatus: "idle",
    getAlbumError: "",
    
    tracks: [],
    createTrackStatus: "idle",
    createTrackError: "",
    getTrackStatus: "idle",
    getTrackError: "",
    
    content: [],
    createContentStatus: "idle",
    createContentError: "",
    getContentStatus: "idle",
    getContentError: ""
}

export const createAlbum = createAsyncThunk(
    'album/createAlbum',
    async (ablum, {rejectWithValue}) => {
        const response = await _createAlbum(ablum)
        if (response.code !== undefined) return rejectWithValue(response)
        return response
    }
)

export const getAlbum = createAsyncThunk(
    'album/getAlbum',
    async (id = undefined, {rejectWithValue}) => {
        const response = await _getAlbum(id)
        if (response.code !== undefined) return rejectWithValue(response)
        return response
    }
)

export const createTrack = createAsyncThunk(
    'album/createTrack',
    async (track, {rejectWithValue}) => {
        const response = await _createTrack(track)
        if (response.code !== undefined) return rejectWithValue(response)
        return response
    }
)

export const getTrack = createAsyncThunk(
    'album/getTrack',
    async (options = undefined, {rejectWithValue}) => {
        const response = await _getTrack(options?.track_id, options?.album_id)
        if (response.code !== undefined) return rejectWithValue(response)
        return response
    }
)

export const createContent = createAsyncThunk(
    'album/createContent',
    async (content, {rejectWithValue}) => {
        const response = await _createContent(content)
        if (response.code !== undefined) return rejectWithValue(response)
        return response
    }
)

export const getContent = createAsyncThunk(
    'album/getContent',
    async (options = undefined, {rejectWithValue}) => {
        const response = await _getContent(options?.content_id, options?.track_id)
        if (response.code !== undefined) return rejectWithValue(response)
        return response
    }
)

export const albumReducer = createSlice({
    name: 'album',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createAlbum.pending, (state) => {
                state.createAlbumStatus = 'loading'
                state.createAlbumError = ""
            })
            .addCase(createAlbum.fulfilled, (state, action) => {
                state.createAlbumStatus = 'fulfilled'
                state.createAlbumError = ""
                if (typeof state.albums !== typeof []) state.albums = []
                state.newAlbumId = action.payload.album._id
                state.albums = [...state.albums, action.payload.album]
            })
            .addCase(createAlbum.rejected, (state, action) => {
                state.createAlbumStatus = 'error'
                state.createAlbumStatus = action.payload.message
            })
            .addCase(getAlbum.pending, (state) => {
                state.getAlbumStatus = 'loading'
                state.getAlbumError = ""
            })
            .addCase(getAlbum.fulfilled, (state, action) => {
                state.getAlbumStatus = 'fulfilled'
                state.getAlbumError = ""
                if (typeof state.albums !== typeof []) state.albums = []
                if (action.payload.albums !== undefined) state.albums = action.payload.albums
                else state.albums = [...state.albums, action.payload.album]
            })
            .addCase(getAlbum.rejected, (state, action) => {
                state.getAlbumStatus = 'error'
                state.getAlbumStatus = action.payload.message
            })

            .addCase(createTrack.pending, (state) => {
                state.createTrackStatus = 'loading'
                state.createTrackError = ""
            })
            .addCase(createTrack.fulfilled, (state, action) => {
                state.createTrackStatus = 'fulfilled'
                state.createTrackError = ""
                if (typeof state.tracks !== typeof []) state.tracks = []
                state.newTrackId = action.payload.track._id
                state.tracks = [...state.tracks, action.payload.track]
            })
            .addCase(createTrack.rejected, (state, action) => {
                state.createTrackStatus = 'error'
                state.createTrackError = action.payload.message
            })
            .addCase(getTrack.pending, (state) => {
                state.getTrackStatus = 'loading'
                state.getTrackError = ""
            })
            .addCase(getTrack.fulfilled, (state, action) => {
                state.getTrackStatus = 'fulfilled'
                state.getTrackError = ""
                if (typeof state.tracks !== typeof []) state.tracks = []
                if (action.payload.tracks !== undefined) state.tracks = action.payload.tracks
                else if (action.payload.album_tracks !== undefined) state.tracks = [ ...state.tracks, ...action.payload.album_tracks]
                else state.tracks = [...state.tracks, action.payload.track]
            })
            .addCase(getTrack.rejected, (state, action) => {
                state.getTrackStatus = 'error'
                state.getTrackError = action?.payload?.message
            })

            .addCase(createContent.pending, (state) => {
                state.createContentStatus = 'loading'
                state.createContentError = ""
            })
            .addCase(createContent.fulfilled, (state, action) => {
                state.createContentStatus = 'fulfilled'
                state.createContentError = ""
                if (typeof state.content !== typeof []) state.content = []
                state.content = [...state.content, ...action.payload.content]
            })
            .addCase(createContent.rejected, (state, action) => {
                state.createContentStatus = 'error'
                state.createContentError = action.payload.message
            })
            .addCase(getContent.pending, (state) => {
                state.getContentStatus = 'loading'
                state.getContentError = ""
            })
            .addCase(getContent.fulfilled, (state, action) => {
                state.getContentStatus = 'fulfilled'
                state.getContentError = ""
                if (typeof state.content !== typeof []) state.content = []
                if (action.payload.content !== undefined) state.content = action.payload.content
                else if (action.payload.track_content !== undefined) state.content = [...state.content, ...action.payload.track_content]
                else state.content = [...state.content, action.payload._content]
            })
            .addCase(getContent.rejected, (state, action) => {
                state.getContentStatus = 'error'
                state.getContentError = action?.payload?.message
            })
    },
})

export default albumReducer.reducer
