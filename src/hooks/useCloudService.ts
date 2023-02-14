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
  query,
  getDocs,
  where,
  orderBy,
} from "firebase/firestore";
import {
  saveFormDataToDB,
  DataFromDBType,
} from "../types/CreateListingFormData";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function useCloudService() {
  let dataSet = new Set<DataFromDBType>();
  const [dataArr, setDataArr] = useState(Array());
  const storeImageToBucket = async (image: File) => {
    // A reference can be thought of as a pointer to a file in the cloud
    const filename = `${auth.currentUser?.uid}-${image.name}-${uuidv4()}}`;
    // Create a storage reference from our storage service
    const storageRef = ref(
      firebaseStorage,
      `images/${auth.currentUser?.uid}/${filename}`
    );
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

  const retrieveDataFromDB = async () => {
    try {
      // Retrieve multiple documents from a collectiom based on
      // current authenticated user
      const q = query(
        collection(firestoreDB, "listings"),
        where("userRef", "==", auth.currentUser?.uid),
        orderBy("timestamp", "desc")
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        dataSet.add({ listingDocId: doc.id, ...doc.data() });
      });
      const dataArrLocal = Array.from(dataSet);
      return dataArrLocal;

      //setData(data);
    } catch (error) {
      const errorMsg = error as FirestoreError;
      console.log(errorMsg);
    }
  };
  return {
    storeImageToBucket,
    retrieveImageUrls,
    storeFormDataToDB,
    retrieveDataFromDB,
  };
}
