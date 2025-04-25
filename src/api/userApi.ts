import { doc, getDoc, setDoc } from "firebase/firestore";
import { ProfileValues } from "../types/Profile";
import { fireDb } from "../firebaseConfig";

export const updateUserProfile = async (payload: ProfileValues) => {
  const user = JSON.parse(localStorage.getItem("user")!);

  const safePayload: ProfileValues = {
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
