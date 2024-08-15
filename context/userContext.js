import React, { createContext, useState, useEffect, useContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [uid, setUid] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                setUid(uid); // Set uid in the state
                try {
                    const docRef = doc(db, "Usuarios", uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        setUserData(userData);
                        console.log(userData);
                    } else {
                        console.log("No se encontraron datos para el usuario.");
                    }
                } catch (error) {
                    console.error("Error al obtener datos del usuario:", error);
                }
            } else {
                setUserData(null);
                setUid(null); // Reset uid when user is not authenticated
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={{ userData, uid }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserData = () => useContext(UserContext);
