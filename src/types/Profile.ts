export interface Education {
  degree: string;
  institution: string;
  percentage: string;
}

export interface Skills {
  technology: string;
  rating: string;
}

export interface Experience {
  company: string;
  designation: string;
  duration: string;
  location: string;
}

export interface Project {
  title: string;
  description: string;
  duration: string;
}

export interface ProfileValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  portfolio: string;
  carrierObjective: string;
  address: string;
  education?: Education[];
  skills?: Skills[];
  experinces?: Experience[];
  projects?: Project[];
}
