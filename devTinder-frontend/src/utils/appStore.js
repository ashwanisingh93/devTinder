import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import feedReducer from './feedSlice';
import connectionReducer from './connectionSlice';
import requestReducer from './requestSlice';

const appStore = configureStore({
  reducer: {
    user: userReducer, // Handles user-related state
    feed: feedReducer, // Handles feed-related state
    connections: connectionReducer, // Handles connection-related state
    requests: requestReducer, // Handles request-related state
  },
});

export default appStore;
