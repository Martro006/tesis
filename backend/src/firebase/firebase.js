import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL, getMetadata } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    //databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    //measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID
}
const app = initializeApp(firebaseConfig);

async function storageOnComplete(file) {
    const storage = getStorage(app);
    const name = "tesis/" + (new Date().getTime()).toString() + file.name;
    const storageRef = ref(storage, name);
    await uploadBytes(storageRef, file.data);
    return name;
}

async function getDownload(name) {
    const storage = getStorage(app);
    const storageRef = ref(storage, name);
    return await getDownloadURL(storageRef)
        .then((url) => url)
        .catch((error) => {
            console.log(error);
        });
}

async function getMetaDatos(name) {
    const storage = getStorage(app);
    const storageRef = ref(storage, name);
    return await getMetadata(storageRef)
        .then((metadata) => metadata)
        .catch((error) => {
            console.log(error);
        });
}

export const methods = {
    storageOnComplete,
    getDownload,
    getMetaDatos
}