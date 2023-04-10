export interface User {
  user: {
    email: string;
    firstname: string;
    lastname: string;
    birthday: string;
    gender: "male" | "female";
    verified: boolean;
    friends: string[];
    friendsRequest: string[];
  };
}
