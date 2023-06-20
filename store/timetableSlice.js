import { createSlice } from "@reduxjs/toolkit";

export const timetableSlice = createSlice({
  name: "timetableId",
  initialState: {
    code: "БOМ35-ПРИ1908",
    type: "uni",
    uni: "Институт математики и информатики",
    program: "09.03.03 Прикладная информатика",
  },
  reducers: {
    setTimetableId: (state, action) => {
      state.code = action.payload.code;
      state.type = action.payload.type;
      state.uni = action.payload.uni;
      state.program = action.payload.program;
    },
  },
});

export const { setTimetableId } = timetableSlice.actions;

export default timetableSlice.reducer;
