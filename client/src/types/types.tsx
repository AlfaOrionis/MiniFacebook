export interface notification {
  _id: string;
  category: "request" | "newFriend";
  friend: { name: string; img: string };
  date: Date;
}

export interface User {
  email: string;
  firstname: string;
  lastname: string;
  birthday: string;
  gender: "male" | "female" | "";
  verified: boolean;
  friends: string[];
  friendsRequest: { started: boolean; _id: string }[] | [];
  relationship?: string;
  work?: string;
  education?: string;
  description?: string;
  livesIn?: string;
  _id?: string;
  password?: string;
  joinedOn?: string;
  photos?: [];
  notifications: notification[] | [];
  notificationsChecked: boolean;
}
