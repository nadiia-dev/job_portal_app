import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { ProfileValues } from "../types/Profile";
import { fireDb } from "../firebaseConfig";
import { Notification } from "../types/Notification";
import {
  setReadNotifications,
  setUnreadNotifications,
} from "../redux/notificationsSlice";
import store from "../redux/store";

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

export const getNotifications = async () => {
  const user = JSON.parse(localStorage.getItem("user")!);
  try {
    const q = query(collection(fireDb, "users", user.id, "notifications"));
    onSnapshot(q, (querySnapshot) => {
      const notifications: Notification[] = [];
      querySnapshot.forEach((doc) => {
        notifications.push({ ...(doc.data() as Notification), id: doc.id });
      });

      const readNotifications = notifications.filter(
        (notification) => notification.status === "read"
      );
      const unreadNotifications = notifications.filter(
        (notification) => notification.status === "unread"
      );
      store.dispatch(setReadNotifications(readNotifications));
      store.dispatch(setUnreadNotifications(unreadNotifications));
    });

    return {
      success: true,
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
