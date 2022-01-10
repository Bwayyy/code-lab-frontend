import { message } from "antd";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { UserRegisterInfo } from "../components/common/shared-types";
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
      await updateProfile(user.user, { displayName: userDisplayName });
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
