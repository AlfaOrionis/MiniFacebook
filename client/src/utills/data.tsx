import { User } from "../types/types";

export const profileInfos = (user: User) => [
  {
    img: "https://static.xx.fbcdn.net/rsrc.php/v3/yX/r/s_ONRClAxbX.png",
    paragraph: "Works at",
    span: user.work || "none",
  },
  {
    img: "https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/H804hWf2rBh.png",
    paragraph: "Studied at",
    span: user.education || "none",
  },
  {
    img: "https://static.xx.fbcdn.net/rsrc.php/v3/y3/r/Yifeo6sHdtL.png",
    paragraph: "Lives in",
    span: user.currentTown || "none",
  },
  {
    img: "https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/eu1ZIPJje34.png",
    paragraph: "",
    span: user.relationship || "none",
  },
  {
    img: "https://static.xx.fbcdn.net/rsrc.php/v3/y-/r/DqqZwK6dixD.png",
    paragraph: "Joined On",
    span: user.joinedOn
      ? user.joinedOn.split(" ")[1] + " " + user.joinedOn.split(" ")[3]
      : "none",
  },
];
