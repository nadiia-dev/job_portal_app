import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  QueryConstraint,
  updateDoc,
  where,
} from "firebase/firestore";
import { Job } from "../types/Job";
import { fireDb } from "../firebaseConfig";
import moment from "moment";
import { DisplayJob } from "../types/DisplayJob";
import { FiltersType } from "../types/Filters";

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
    await addDoc(collection(fireDb, "users", "admin", "notifications"), {
      title: `New Job Post Request from ${user.name}`,
      onClick: `/admin/jobs`,
      createdAt: moment().format("DD-MM-YYYY HH:mm A"),
      status: "unread",
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
    const q = query(collection(fireDb, "jobs"), orderBy("postedOn", "desc"));
    const docSnap = await getDocs(q);
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

export const updateJobStatus = async (payload: DisplayJob) => {
  try {
    await updateDoc(doc(fireDb, "jobs", payload.id), {
      ...payload,
      updatedOn: moment().format("DD-MM-YYYY HH:mm A"),
    });
    await addDoc(
      collection(fireDb, "users", payload.postedByUserId, "notifications"),
      {
        title: `Your job post request for ${payload.title} has been ${payload.status}`,
        onClick: `/posted-jobs`,
        createdAt: moment().format("DD-MM-YYYY HH:mm A"),
        status: "unread",
      }
    );
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

export const getAllJobs = async (filters?: FiltersType) => {
  try {
    const whereClause: QueryConstraint[] = [];
    if (filters) {
      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          whereClause.push(where(key, "==", filters[key]));
        }
      });
    }
    const q = query(collection(fireDb, "jobs"), ...whereClause);
    const docSnap = await getDocs(q);
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
