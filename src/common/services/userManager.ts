import { doc, setDoc, getDoc,updateDoc} from "firebase/firestore"
import db from "../../firebase.config";
import { Google2AuthCredentialType, UserType } from "../../types/stores";
import { keyUID } from "../helpers/random";
import { Clone } from "../helpers/object";

export async function getUser(userName: string): Promise<UserType | null> {
  const docRef = doc(db,"/profile",userName);
  const userSnapshot = await getDoc(docRef);
  if(userSnapshot.data()) {
    const user=userSnapshot.data();

    return Clone(user) as UserType;
  }
  return null ;
}

export async function createUser(userName: string,google_credential?:Google2AuthCredentialType): Promise<UserType> {
  const docRef = doc(db,"/profile",userName);//import.meta.env.VITE_PATH_SEGMENT);
  const newUser: UserType = {
     isAdmin: false,
     name: userName,
     userCakes: [],
     id: keyUID(32),
     google_credential
  }

  await setDoc(docRef,newUser);

  return newUser;
}

export async function setUserAdmin(user:UserType | null | undefined, admin: boolean): Promise<void> {
  const userName = user?.name;
  if(!userName) return;
  const docRef = doc(db,"/profile",userName);
  updateDoc(docRef,{isAdmin:admin});
  return;
}

export async function setUserMarket(user:UserType | null | undefined): Promise<void> {
  const userName = user?.name;
  if(!userName) return;
  const docRef = doc(db,"/profile",userName);
  updateDoc(docRef,{userCakes:user.userCakes});
  return;
}