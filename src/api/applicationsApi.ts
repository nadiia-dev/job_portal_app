import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { DisplayJob } from "../types/DisplayJob";
import { fireDb } from "../firebaseConfig";
import moment from "moment";
import { Application } from "../types/Application";

const user = JSON.parse(localStorage.getItem("user")!);

export const applyForJob = async (payload: DisplayJob) => {
  try {
    await addDoc(collection(fireDb, "applications"), {
      jobId: payload.id,
      jobTitle: payload.title,
      company: payload.company,
      userId: user.id,
      userName: user.name,
      email: user.email,
      phoneNumber: user?.phoneNumber || "",
      appliedOn: moment().format("DD-MM-YYYY HH:mm A"),
      status: "pending",
    });
    return {
      success: true,
      message: "Job applied successfully",
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

export const getApplicationsByUserId = async (userId: string) => {
  try {
    const applications: Application[] = [];
    const qry = query(
      collection(fireDb, "applications"),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(qry);
    querySnapshot.forEach((doc) => {
      applications.push({
        ...(doc.data() as Application),
        id: doc.id,
      });
    });
    return {
      success: true,
      data: applications,
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

export const getApplicationsByJobId = async (jobId: string) => {
  try {
    const applications: Application[] = [];
    const qry = query(
      collection(fireDb, "applications"),
      where("jobId", "==", jobId)
    );
    const querySnapshot = await getDocs(qry);
    querySnapshot.forEach((doc) => {
      applications.push({
        ...(doc.data() as Application),
        id: doc.id,
      });
    });
    return {
      success: true,
      data: applications,
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

export const getAllApplications = async () => {
  try {
    const applications: Application[] = [];
    const qry = query(collection(fireDb, "applications"));
    const querySnapshot = await getDocs(qry);
    querySnapshot.forEach((doc) => {
      applications.push({
        ...(doc.data() as Application),
        id: doc.id,
      });
    });
    return {
      success: true,
      data: applications,
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

export const changeApplicationStatus = async (payload: Application) => {
  try {
    await updateDoc(doc(fireDb, "applications", payload.id), {
      ...payload,
      updatedOn: moment().format("DD-MM-YYYY HH:mm A"),
    });
    await addDoc(collection(fireDb, `users/${payload.userId}/notifications`), {
      title: `Your application for ${payload.jobTitle} in ${payload.company} is ${payload.status}`,
      onClick: `/applied-jobs`,
      status: "unread",
      createdAt: moment().format("DD-MM-YYYY HH:mm A"),
    });
    return {
      success: true,
      message: "Application status updated successfully",
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
