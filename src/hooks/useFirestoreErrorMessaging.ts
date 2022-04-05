import { message } from "antd";
import { FirestoreError } from "firebase/firestore";
import { useEffect } from "react";

export default function useFirestoreErrorMessaging(error?: FirestoreError) {
  useEffect(() => {
    if (error) {
      message.error(error?.message);
    }
  }, [error]);
}
