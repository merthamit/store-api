import { configureStore } from '@reduxjs/toolkit';
import fakeStore from '../features/fakeStoreSlice';

export default configureStore({
  reducer: {
    fakeStore: fakeStore,
  },
});
