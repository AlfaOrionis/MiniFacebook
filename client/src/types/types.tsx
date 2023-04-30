export interface notification {
  _id: {
    _id: string;
    firstname: string;
    lastname: string;
    profilePicture: { url: string; public_id: string };
  };
  category: "request" | "newFriend";
  friend: { name: string; img: { url: string; public_id: string } };
  date: Date;
}
export interface friend {
  _id: string;
  firstname: string;
  lastname: string;
  profilePicture: string;
}

export interface User {
  email: string;
  firstname: string;
  lastname: string;
  birthday: string;
  gender: "male" | "female" | "";
  verified: boolean;
  friends: friend[] | [];
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
  profilePicture: { url: string; public_id: string } | "";
  backgroundPicture: { url: string; public_id: string } | "";
}
