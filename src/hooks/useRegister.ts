import { message } from "antd";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { UserRegisterInfo } from "../components/common/shared-types";
import { addUser } from "../firebase/database/users-collection";
import { auth } from "../firebase/firebaseApp";

export default function useRegister() {
  const [loading, setLoading] = useState(false);
  const register = async ({
    email,
    password,
    userDisplayName,
  }: UserRegisterInfo) => {
    try {
      setLoading(true);
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log({ user });
      await updateProfile(user.user, { displayName: userDisplayName });
      await addUser(user.user.uid, { displayName: userDisplayName });
      message.success("Register Successfully");
    } catch (err) {
      setLoading(false);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return { register, loading };
}
