import { Y } from "@syncedstore/core";
import { useEffect, useState } from "react";
import { WebsocketProvider } from "y-websocket";
import useUserData from "../useUserData";
export default function useCollaborativeEditing({
  room,
}: {
  room: string;
  text: string;
}) {
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<WebsocketProvider>();
  const { userData } = useUserData();
  const initDocument = () => {
    const doc = new Y.Doc();
    setDoc(doc);
    return doc;
  };
  const initProvider = (doc: Y.Doc) => {
    provider?.destroy();
    const wsProvider = new WebsocketProvider("ws://localhost:1234", room, doc);
    wsProvider.awareness.setLocalState({ username: userData?.username });
    setProvider(wsProvider);
    console.log("connected to", room);
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
      console.log("leave room", room);
    };
  }, [room]);
  return { doc, provider };
}
