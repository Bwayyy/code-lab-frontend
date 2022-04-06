import { Y } from "@syncedstore/core";
import { useEffect, useMemo, useState } from "react";
import { WebsocketProvider } from "y-websocket";
import useUserData from "../useUserData";
export default function useYjs({ room }: { room: string }) {
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<WebsocketProvider>();
  const { userData } = useUserData();
  const isReady = useMemo(
    () =>
      doc !== undefined &&
      provider !== undefined &&
      provider.awareness !== undefined,
    [doc, provider]
  );
  const initDocument = () => {
    const doc = new Y.Doc();
    setDoc(doc);
    return doc;
  };
  const initProvider = (doc: Y.Doc) => {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    provider?.destroy();
    const wsProvider = new WebsocketProvider("ws://localhost:1234", room, doc);
    wsProvider.awareness.setLocalStateField("user", {
      name: userData?.displayName,
      color: "#" + randomColor,
    });
    setProvider(wsProvider);
  };
  useEffect(() => {
    if (!room) {
      provider?.destroy();
      return;
    }
    const doc = initDocument();
    initProvider(doc);
    return () => {
      provider?.destroy();
    };
  }, [room]);
  return { doc, provider, isReady };
}
