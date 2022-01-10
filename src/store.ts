import { configureStore } from "@reduxjs/toolkit";
import fileRepositorySlice from "./reducers/FileRepositorySlice";
import globalSlice from "./reducers/globalSlice";
import workspaceSlice from "./reducers/workspaceSlice";

export const store = configureStore({
  reducer: {
    global: globalSlice,
    workspaces: workspaceSlice,
    fileRepository: fileRepositorySlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
