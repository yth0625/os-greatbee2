import { configureStore } from '@reduxjs/toolkit';
import popUpReducer from './popUpReducer';

export const store = configureStore({
  reducer: {
    popup: popUpReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
