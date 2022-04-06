import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFileToTab,
  removeAllTabs,
  removeTab,
  setActiveTabKey,
} from "../../reducers/FileRepositorySlice";
import { RootState } from "../../store";
import { RepositoryFile } from "../../types/file-repository-types";

export default function useFileTabs() {
  const dispatch = useDispatch();
  const activeFile = useSelector(
    (state: RootState) => state.fileRepository.activeFile
  );
  const addFile = (file: RepositoryFile) => {
    dispatch(addFileToTab(file));
    dispatch(setActiveTabKey(file.key));
  };
  const remove = (key: number) => {
    dispatch(removeTab(key));
  };
  const onTabClick = (key: number) => {
    dispatch(setActiveTabKey(key));
  };
  return { activeFile, addFileToTab: addFile, remove, onTabClick };
}
