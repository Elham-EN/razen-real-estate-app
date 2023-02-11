import { auth, firebaseStorage, firestoreDB } from "../firebase.config";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  StorageError,
  StorageReference,
} from "firebase/storage";
import {
  addDoc,
  collection,
  serverTimestamp,
  FirestoreError,
} from "firebase/firestore";
import { saveFormDataToDB } from "../types/CreateListingFormData";

export default function useCloudService() {
  const storeImageToBucket = async (image: File) => {
    // A reference can be thought of as a pointer to a file in the cloud
    const filename = `${auth.currentUser?.uid}-${image.name}}`;
    // Create a storage reference from our storage service
    const storageRef = ref(firebaseStorage, `images/${filename}`);
    try {
      // Upload image to the cloud storage
      const result = await uploadBytes(storageRef, image);
      return result.ref;
    } catch (error) {
      const errorMsg = error as StorageError;
      console.log(errorMsg);
    }
  };

  const retrieveImageUrls = async (
    storageRef: StorageReference | undefined
  ) => {
    try {
      //  Download URL for a file from cloud storage
      if (storageRef) {
        const imageURL = await getDownloadURL(storageRef);
        return imageURL;
      }
    } catch (error) {
      const errorMsg = error as StorageError;
      console.log(errorMsg);
    }
  };

  const storeFormDataToDB = async (data: saveFormDataToDB) => {
    try {
      // Add a new new document to the listings collection
      // with a genrated id.
      await addDoc(collection(firestoreDB, "listings"), {
        ...data,
        timestamp: serverTimestamp(),
        userRef: auth.currentUser?.uid,
      });
      console.log("Document added to the listings collection");
    } catch (error) {
      const errorMsg = error as FirestoreError;
      console.log(errorMsg);
    }
  };

  return { storeImageToBucket, retrieveImageUrls, storeFormDataToDB };
}
