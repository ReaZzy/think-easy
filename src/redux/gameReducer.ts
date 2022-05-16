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
      return {
        ...state,
        ...(Object.keys(action.payload) as Array<keyof InitialState>).reduce(
          (acc: InitialState, question) => {
            acc[question] = action.payload[question]
              ?.replace(/\s+/g, ' ')
              ?.trimStart();
            return acc;
          },
          {}
        ),
      };
    },
    clear: (state) => {
      return {
        ...state,
        where: '',
        when: '',
        what: '',
        who: '',
      };
    },
  },
});

export const { setValue, clear } = gameReducer.actions;
export default gameReducer.reducer;
