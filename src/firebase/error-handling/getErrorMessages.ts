import { FirebaseError } from "firebase/app";

export const getErrorMessages = (error: FirebaseError) => {
  console.log({ error });
  if (error.code === "auth/email-already-in-use") {
    return "Email is already in use, please user another email";
  } else if (error.code === "auth/wrong-password") {
    return "The login credential is not valid, please use correct email and password";
  } else if (error.code === "auth/user-not-found") {
    return "The user does not exist";
  }
  return error.message;
};
