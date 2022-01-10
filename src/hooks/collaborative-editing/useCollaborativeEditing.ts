import syncedStore, { getYjsValue, SyncedText, Y } from "@syncedstore/core";
import { useSyncedStore } from "@syncedstore/react";
import { useEffect, useState } from "react";
import { WebrtcProvider } from "y-webrtc";
import { Transaction } from "yjs";
export type SyncContent = {
  root: {
    content?: SyncedText;
  };
};
export default function useCollaborativeEditing({
  room,
  text,
}: {
  room: string;
  text: string;
}) {
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<WebrtcProvider>();
  const initDocument = () => {
    const doc = new Y.Doc();
    doc.whenLoaded = new Promise(() => {
      console.log(doc.getText("monaco"));
    });
    doc.on("writeState", () => {
      debugger;
    });
    doc.on(
      "update",
      (update: Uint8Array, origin: any, doc: Y.Doc, tr: Transaction) => {
        console.log({ update, origin, doc, tr });
      }
    );
    setDoc(doc);
    return doc;
  };
  const initProvider = (doc: Y.Doc) => {
    provider?.destroy();
    setProvider(
      new WebrtcProvider(room, doc, {
        signaling: [
          "wss://signaling.yjs.dev",
          "wss://y-webrtc-signaling-eu.herokuapp.com",
          "wss://y-webrtc-signaling-us.herokuapp.com",
        ],
      } as any)
    );
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
      console.log("destroy", room);
    };
  }, [room]);
  return { doc, provider };
}
