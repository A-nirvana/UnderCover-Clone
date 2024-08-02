import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "@/lib/firebase/firbaseConfig";
import { doc, setDoc } from "firebase/firestore";

export const createUser = async (
  email: string,
  usernmae: string,
  password: string
) => {
  try {
    const userCred = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await setDoc(doc(db, "users", userCred.user.uid), {
      username: usernmae,
      email: email,
      id: userCred.user.uid,
      words: [],
    });
    await setDoc(doc(db, "general", "users"), {
      id: userCred.user.uid,
    });

    return userCred.user;
  } catch (err: any) {
    console.log(err);
  }
};

export const signUser = async (email: string, password: string) => {
  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    return userCred.user;
  } catch (err) {
    return err;
  }
};

export async function signOut() {
  try {
    return auth.signOut();
  } catch (error) {
    console.error("Error signing out", error);
  }
}
