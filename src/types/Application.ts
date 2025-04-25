export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  userId: string;
  userName: string;
  email: string;
  phoneNumber?: string;
  appliedOn: string;
  status: string;
}
