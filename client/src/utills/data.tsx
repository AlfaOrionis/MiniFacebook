import { User } from "../types/types";

export type type =
  | "work"
  | "education"
  | "livesIn"
  | "relationship"
  | "joinedOn"
  | "";
export interface info {
  type: type;
  img: string;
  paragraph: string;
  span: string | undefined;
  add?: string;
}

export type profileInfo = info[];

export const profileInfos: (user: User) => profileInfo = (user: User) => [
  {
    type: "work",
    img: "https://static.xx.fbcdn.net/rsrc.php/v3/yX/r/s_ONRClAxbX.png",
    paragraph: "Works at",
    span: user.work,
    add: "a workplace",
  },
  {
    type: "education",
    img: "https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/H804hWf2rBh.png",
    paragraph: "Studied at",
    span: user.education,
    add: "school",
  },
  {
    type: "livesIn",
    img: "https://static.xx.fbcdn.net/rsrc.php/v3/y3/r/Yifeo6sHdtL.png",
    paragraph: "Lives in",
    span: user.livesIn,
    add: "current city",
  },
  {
    type: "relationship",
    img: "https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/eu1ZIPJje34.png",
    paragraph: "",
    span: user.relationship,
    add: "a relationship status",
  },
  {
    type: "joinedOn",
    img: "https://static.xx.fbcdn.net/rsrc.php/v3/y-/r/DqqZwK6dixD.png",
    paragraph: "Joined On",
    span:
      user.joinedOn &&
      user.joinedOn.split(" ")[1] + " " + user.joinedOn.split(" ")[3],
  },
];
