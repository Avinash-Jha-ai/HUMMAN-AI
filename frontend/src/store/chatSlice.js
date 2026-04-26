import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  messages: [],
  sessions: [],
  currentChatId: null,
  loading: false,
  error: null,
};

export const sendMessage = createAsyncThunk('chat/sendMessage', async ({ message, chatId }, { rejectWithValue }) => {
  try {
    const response = await axios.post('/api/chat', { message, chatId });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchHistory = createAsyncThunk('chat/fetchHistory', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/api/history');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchChatMessages = createAsyncThunk('chat/fetchChatMessages', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/api/chat/${id}`);
    return { ...response.data, chatId: id };
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteChat = createAsyncThunk('chat/deleteChat', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`/api/chat/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setCurrentChatId: (state, action) => {
      state.currentChatId = action.payload;
    },
    startNewChat: (state) => {
      state.currentChatId = null;
      state.messages = [];
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => { state.loading = true; })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push({ role: 'assistant', content: action.payload.reply });
        state.currentChatId = action.payload.chatId;
        // Update session list if new chat
        const sessionIdx = state.sessions.findIndex(s => s._id === action.payload.chatId);
        if (sessionIdx === -1) {
          state.sessions.unshift({ _id: action.payload.chatId, title: action.payload.title });
        }
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Chat failed';
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.sessions = action.payload.sessions;
      })
      .addCase(fetchChatMessages.pending, (state) => { state.loading = true; })
      .addCase(fetchChatMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload.messages;
        state.currentChatId = action.payload.chatId;
      })
      .addCase(fetchChatMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch messages';
      })
      .addCase(deleteChat.fulfilled, (state, action) => {
        state.sessions = state.sessions.filter(s => s._id !== action.payload);
        if (state.currentChatId === action.payload) {
          state.currentChatId = null;
          state.messages = [];
        }
      });
  },
});

export const { addMessage, setCurrentChatId, startNewChat, clearError } = chatSlice.actions;
export default chatSlice.reducer;
