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
    const normalizedEmail = correo.toLowerCase().trim();
    const userCredential = await createUserWithEmailAndPassword(auth, normalizedEmail, contraseña);
    const uid = userCredential.user.uid;

    const admin = normalizedEmail === "admin@gmail.com";

    await setDoc(doc(db, "usuariosIO2", uid), {
      nombre,
      correo: normalizedEmail,
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
    const normalizedEmail = email.toLowerCase().trim();
    const userCredential = await signInWithEmailAndPassword(auth, normalizedEmail, password);
    const user = userCredential.user;

    const q = query(collection(db, "usuariosIO2"), where("correo", "==", normalizedEmail));
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

export const getSalesData = async () => {
  try {
    const snapshot = await getDocs(query(collection(db, "cartIO2")));
    const data = snapshot.docs.map((doc) => {
      const item = doc.data();
      return {
        id: doc.id,
        product: item.productos || "Sin nombre",
        total: item.monto || 0,
        date: item.fecha?.toDate().toISOString().split("T")[0] || "Sin fecha",
      };
    });

    data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return { success: true, data };
  } catch (error) {
    console.error("Error al obtener ventas:", error);
    return { success: false, error };
  }
};