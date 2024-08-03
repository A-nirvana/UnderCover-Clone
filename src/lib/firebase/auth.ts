import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  NextOrObserver,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";

import { db, storage } from "./clientApp";
import { auth } from "./clientApp";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

export function onAuthStateChanged(cb: NextOrObserver<User>): () => void {
  return _onAuthStateChanged(auth, cb);
}

export async function createUser(email : string, password : string, userName : string): Promise<User | null> {
  try{
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      if (auth.currentUser) {
        await setDoc(doc(db, "users", userCred.user.uid), {
          username : userName,
          email,
          premium: false,
          id: userCred.user.uid,
          used: []
        });

        return userCred.user;
    } else {
        throw new Error("Current user is null");
    }
  }
  catch(error : any){
      console.log("Error creating new user", error);
      return error;
  }
}

export async function signUser(email : string, password : string){
  let user: any;
  try{
      const userCred = await signInWithEmailAndPassword(auth,email, password);
      user = userCred.user;
  }
  catch(error){
      console.log("Error Signing in", error)
      return error
  }
  return user;
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  let user : any;
  try {
    await signInWithPopup(auth, provider)
    .then((userCred)=>{
      user = userCred.user;
    });

    const userDoc = await getDoc(doc(db,"users",user.uid));
    if(!userDoc.exists()){
      await setDoc(doc(db, "users", user.uid), {
        username : user.displayName,
        email : user.email,
        id: user.uid,
        premium: false,
        used: []
      });
    }
  } catch (error : any) {
    console.error("Error signing in with Google", error);
    return error
  }
  return user;
}

export async function signInWithFacebook() {
  const provider = new FacebookAuthProvider();
  let user : any;
  try {
    await signInWithPopup(auth, provider)
    .then((userCred)=>{
      return userCred.user;
    });
    const userDoc = await getDoc(doc(db,"users",user.uid));
    if(!userDoc.exists()){
      await setDoc(doc(db, "users", user.uid), {
        username : user.displayName,
        email : user.email,
        id: user.uid,
        premium: false,
        used: []
      });

    }
  } catch (error:any) {
    console.error("Error signing in with Google", error);
    return error;
  }
  return user;
}

export async function signOut() {
  try {
    return auth.signOut();
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}