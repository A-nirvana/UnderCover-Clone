import {
	collection,
	doc,
	getDoc,
	updateDoc,
	arrayUnion,
} from "firebase/firestore";

import { db } from "./clientApp";
import { User } from "firebase/auth";

export const addUsed = async (user: User | null | undefined, words: string[]) => {
	const userRef = collection(db, "users");
	try {
		await updateDoc(doc(userRef, user?.uid), {
			used: arrayUnion({
				words
			}),
		});
	} catch (err) {
		console.log(err);
	}
}

export const getUser = async (user: User | null | undefined,) => {
	const userRef = doc(db, "users", user?.uid?user.uid:"");
	const userDetails = await getDoc(userRef);
	return userDetails.data();

}
