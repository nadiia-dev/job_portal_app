import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { Job } from "../types/Job";
import { fireDb } from "../firebaseConfig";
import moment from "moment";
import { DisplayJob } from "../types/DisplayJob";
import { Application } from "../types/Application";

const user = JSON.parse(localStorage.getItem("user")!);

export const saveJob = async (payload: Job) => {
  try {
    await addDoc(collection(fireDb, "jobs"), {
      ...payload,
      status: "pending",
      postedByUserId: user.id,
      postedByUserName: user.name,
      postedOn: moment().format("DD-MM-YYYY HH:mm A"),
    });
    return {
      success: true,
      message: "New job posted successfully",
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

export const getJobsByUser = async (userId: string) => {
  try {
    const docSnap = await getDocs(collection(fireDb, "jobs"));
    const jobs: DisplayJob[] = [];
    docSnap.forEach((doc) => {
      if (doc.data().postedByUserId === userId) {
        jobs.push({
          ...(doc.data() as DisplayJob),
          id: doc.id,
        });
      }
    });
    return {
      success: true,
      data: jobs,
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

export const getJobById = async (id: string) => {
  try {
    const docRef = doc(fireDb, "jobs", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        success: true,
        data: docSnap.data(),
      };
    } else {
      return {
        success: false,
        message: "No such job!",
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

export const updateJob = async (payload: DisplayJob) => {
  try {
    await updateDoc(doc(fireDb, "jobs", payload.id), {
      ...payload,
      updatedOn: moment().format("DD-MM-YYYY HH:mm A"),
    });
    return {
      success: true,
      message: "Job updated successfully",
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

export const deleteJob = async (id: string) => {
  try {
    const docRef = doc(fireDb, "jobs", id);
    await deleteDoc(docRef);
    return {
      success: true,
      message: "Job deleted successfully",
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

export const getAllJobs = async () => {
  try {
    const docSnap = await getDocs(collection(fireDb, "jobs"));
    const jobs: DisplayJob[] = [];
    docSnap.forEach((doc) => {
      jobs.push({
        ...(doc.data() as DisplayJob),
        id: doc.id,
      });
    });
    return {
      success: true,
      data: jobs,
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
