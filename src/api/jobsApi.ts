import { addDoc, collection } from "firebase/firestore";
import { Job } from "../types/Job";
import { fireDb } from "../firebaseConfig";
import moment from "moment";

export const saveJob = async (payload: Job) => {
  const user = JSON.parse(localStorage.getItem("user")!);
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
