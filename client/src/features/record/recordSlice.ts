import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  recordInfo: localStorage.getItem('recordInfo')
    ? JSON.parse(localStorage.getItem('recordInfo') || '{}')
    : null,
};

const recordSlice = createSlice({
  name: 'record',
  initialState,
  reducers: {
    setRecord: (state, action) => {
      state.recordInfo = action.payload;
      localStorage.setItem('recordInfo', JSON.stringify(action.payload));
    },
    clearRecord: (state) => {
      state.recordInfo = null;
      localStorage.removeItem('recordInfo');
    },
  },
});

export const { setRecord, clearRecord } = recordSlice.actions;

export default recordSlice.reducer;
