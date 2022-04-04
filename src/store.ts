import { configureStore } from "@reduxjs/toolkit";
import assignmentSlice from "./reducers/assignmentSlice";
import fileRepositorySlice from "./reducers/FileRepositorySlice";
import globalSlice from "./reducers/globalSlice";
import liveCodingSlice from "./reducers/liveCodingSlice";
import workspaceSlice from "./reducers/workspaceSlice";
import storage from "redux-persist/lib/storage/session";
import { persistCombineReducers, persistStore } from "redux-persist";

export const store = configureStore({
  reducer: persistCombineReducers(
    { key: "root", storage, blacklist: ["global"] },
    {
      global: globalSlice,
      workspaces: workspaceSlice,
      fileRepository: fileRepositorySlice,
      liveCoding: liveCodingSlice,
      assignments: assignmentSlice,
    }
  ),
});
const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const getAppState = store.getState;
export const storePersistor = persistor;
