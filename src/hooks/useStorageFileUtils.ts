import { getBlob, StorageReference } from "firebase/storage";

export default function useStorageFileUtils() {
  const downloadFile = async (ref: StorageReference) => {
    const blob = await getBlob(ref);
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = ref.name;
    document.body.appendChild(link);
    link.click();
  };
  return { downloadFile };
}
