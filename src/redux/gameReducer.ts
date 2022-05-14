import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  who: '',
  where: '',
  when: '',
  what: '',
};
type InitialState = Partial<typeof initialState>;

const gameReducer = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<InitialState>) => {
      return { ...state, ...action.payload };
    },
  },
});
export const { setValue } = gameReducer.actions;
export default gameReducer.reducer;
