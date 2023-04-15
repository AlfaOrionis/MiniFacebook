export interface User {
  email: string;
  firstname: string;
  lastname: string;
  birthday: string;
  gender: "male" | "female";
  verified: boolean;
  friends?: string[];
  friendsRequest?: string[];
  relationship?: string;
  work?: string;
  education?: string;
  description?: string;
  currentTown?: string;
  _id?: string;
  password?: string;
  joinedOn?: string;
}
