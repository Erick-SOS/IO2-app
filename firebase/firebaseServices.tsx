import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  
};

const app = initializeApp(firebaseConfig);

let analytics;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

const db = getFirestore(app);
const auth = initializeAuth(app);

export const registerUser = async ({
  nombre,
  correo,
  contraseña,
  celular,
  direccion,
}: {
  nombre: string;
  correo: string;
  contraseña: string;
  celular: number;
  direccion: string;
}) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, correo, contraseña);
    const uid = userCredential.user.uid;

    const admin = correo === "admin@gmail.com";

    await setDoc(doc(db, "usuariosIO2", uid), {
      nombre,
      correo,
      celular,
      direccion,
      admin,
    });

    return { success: true };
  } catch (error) {
    console.error("Error al registrar:", error);
    return { success: false, error };
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const q = query(collection(db, "usuariosIO2"), where("correo", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { success: false, error: "Usuario no encontrado en la base de datos" };
    }

    const userData = querySnapshot.docs[0].data();

    return {
      success: true,
      user: {
        uid: user.uid ?? "",
        correo: user.email ?? "",
        nombre: userData.nombre ?? "",
        celular: userData.celular ?? "",
        direccion: userData.direccion ?? "",
        admin: userData.admin ?? false,
      },
    };
  } catch (error) {
    return { success: false, error };
  }
};

export const saveOrder = async ({
  monto,
  productos,
}: {
  monto: number;
  productos: string;
}) => {
  try {
    await addDoc(collection(db, "cartIO2"), {
      productos,
      monto,
      fecha: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.error("Error guardando la orden:", error);
    return { success: false, error };
  }
};

