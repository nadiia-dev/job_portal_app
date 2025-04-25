import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { ProfileValues } from "../types/Profile";
import { fireDb } from "../firebaseConfig";

export const updateUserProfile = async (payload: ProfileValues) => {
  const user = JSON.parse(localStorage.getItem("user")!);

  const safePayload: ProfileValues = {
    id: user.id || "",
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    phoneNumber: payload.phoneNumber,
    portfolio: payload.portfolio,
    carrierObjective: payload.carrierObjective,
    address: payload.address,
    education: payload.education ?? [],
    skills: payload.skills ?? [],
    experinces: payload.experinces ?? [],
    projects: payload.projects ?? [],
    status: payload.status || "pending",
  };

  try {
    await setDoc(doc(fireDb, "users", user.id), safePayload, { merge: true });
    return {
      success: true,
      message: "Profile updated successfully",
    };
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  }
};

export const getProfile = async (id: string) => {
  try {
    const docRef = doc(fireDb, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        success: true,
        data: docSnap.data(),
      };
    } else {
      return {
        success: false,
        message: "No such user!",
      };
    }
  } catch (e) {
    if (e instanceof Error) {
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  }
};

export const getAllUsers = async () => {
  try {
    const docSnap = await getDocs(collection(fireDb, "users"));
    const users: ProfileValues[] = [];
    docSnap.forEach((doc) => {
      users.push({
        ...(doc.data() as ProfileValues),
        id: doc.id,
      });
    });
    return {
      success: true,
      data: users,
    };
  } catch (e) {
    if (e instanceof Error) {
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  }
};

export const updateUserStatus = async (id: string, status: string) => {
  try {
    await updateDoc(doc(fireDb, "users", id), {
      status,
    });
    return {
      success: true,
      message: "User status updated successfully",
    };
  } catch (e) {
    if (e instanceof Error) {
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  }
};
