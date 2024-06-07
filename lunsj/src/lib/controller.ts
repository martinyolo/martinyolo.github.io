import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import { app } from "./firebase";
import { NewGoogleUser, GoogleUser} from "../types";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";

const firestore = getFirestore(app);

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  // check if user exist in database
  const users = await getDocs(usersCollection);
  const user = users.docs.find((user) => user.data().uid === result.user.uid);
  if (!user?.exists()) {
    // create user in database
    const userData: NewGoogleUser = {
      uid: result.user.uid,
      displayName: result.user.displayName,
      photoURL: result.user.photoURL,
      email: result.user.email,
      phoneNumber: result.user.phoneNumber,
    };
    await addGoogleUser(userData);
  }
  return result.user;
};

export const logOut = async () => {
  await auth.signOut();
};

export const addGoogleUser = async (userData: NewGoogleUser) => {
  await addDoc(usersCollection, { ...userData });
};

export async function getUserFromUid(uid: string) {
  const userRef = query(usersCollection, where("uid", "==", uid));
  const snapshot = await getDocs(userRef);
  if (snapshot.empty) {
    return;
  }

  const doc = snapshot.docs[0];
  const user: GoogleUser = {
    id: doc.id,
    uid: doc.data().uid,
    displayName: doc.data().displayName,
    photoURL: doc.data().photoURL,
    email: doc.data().email,
    phoneNumber: doc.data().phoneNumber,
  };

  return user;
}

export const usersCollection = collection(firestore, "users"); // Get all users

// GET SPECIFIC USER
export const getUser = async (id: string) => {
  const document = doc(firestore, `users/${id}`);
  const user = await getDoc(document);
  return user;
};