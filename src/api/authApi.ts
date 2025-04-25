import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { User } from "../types/User";
import { fireDb } from "../firebaseConfig";
import CryptoJS from "crypto-js";

export const registerApi = async (payload: User) => {
  try {
    const q = query(
      collection(fireDb, "users"),
      where("email", "==", payload.email)
    );
    const snapshot = await getDocs(q);
    if (snapshot.size > 0) {
      return {
        success: false,
        message: "Email already exists",
      };
    }

    const encryptedPass = CryptoJS.AES.encrypt(
      payload.password,
      "job_portal_app"
    ).toString();
    payload.password = encryptedPass;

    const newUser = await addDoc(collection(fireDb, "users"), payload);
    return {
      success: true,
      message: "User Registered Successfully",
      data: newUser,
    };
  } catch (e) {
    if (e instanceof Error)
      return {
        success: false,
        message: e.message,
        data: null,
      };
  }
};

export const loginApi = async (payload: User) => {
  try {
    const q = query(
      collection(fireDb, "users"),
      where("email", "==", payload.email)
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return {
        success: false,
        message: "User not found",
      };
    } else {
      const snapshotData = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          email: data.email,
          password: data.password,
          isAdmin: data.isAdmin || false,
        } as User;
      });
      const user = snapshotData[0];

      const decryptedPassword = CryptoJS.AES.decrypt(
        user.password,
        "job_portal_app"
      ).toString(CryptoJS.enc.Utf8);

      if (decryptedPassword === payload.password) {
        return {
          success: true,
          message: "Login successful",
          data: {
            ...user,
            password: "",
          },
        };
      } else {
        return {
          success: false,
          message: "Incorrect password",
        };
      }
    }
  } catch (e) {
    if (e instanceof Error)
      return {
        success: false,
        message: e.message,
        data: null,
      };
  }
};
