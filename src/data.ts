const digits = "0123456789";
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const chars = digits + letters;

export function makeId() {
  let j = Math.round(Math.random() * letters.length);
  let id = letters[j];
  for (let i = 0; i < 7; i++) {
    j = Math.round(Math.random() * chars.length);
    id += chars[j];
  }
  return id;
}

export interface Contact {
  first: string;
  last: string;
  avatar: string;
  twitter: string;
  notes: string;
  favorite: boolean;
}

export const data: Record<string, Contact> = {
  FQvd3Xc9: {
    first: "Eddard",
    last: "Stark",
    avatar:
      "https://i.pinimg.com/originals/f2/76/59/f276599c999649d313658bea301c1e7b.jpg",
    twitter: "@ned",
    notes:
      "Lord Eddard Stark, also known as Ned Stark, was the head of House Stark, the Lord of Winterfell and Warden of the North, and later Hand of the King to King Robert I Baratheon.",
    favorite: true,
  },
  ReylCDLZ: {
    first: "Cersei",
    last: "Lannister",
    avatar:
      "https://c4.wallpaperflare.com/wallpaper/85/137/121/tv-show-game-of-thrones-cersei-lannister-lena-headey-wallpaper-preview.jpg",
    twitter: "@cersei",
    notes:
      "Queen Cersei I Lannister was the twentieth ruler of the Seven Kingdoms and the widow of King Robert Baratheon.",
    favorite: false,
  },
  egAXtEMU: {
    first: "Tyrion",
    last: "Lannister",
    avatar:
      "https://cdnb.artstation.com/p/assets/images/images/042/046/073/large/sungwoo-jo-14.jpg",
    twitter: "@tyrion",
    notes:
      "Lord Tyrion Lannister is the youngest child of Lord Tywin Lannister and younger brother of Cersei and Jaime Lannister.",
    favorite: true,
  },
  EQjaffe1: {
    first: "Danaerys",
    last: "Targaryen",
    avatar:
      "https://i.pinimg.com/736x/da/88/6d/da886de0b3e3ac7a70afd3f9ca9e9e3e--daenerys-targaryen-juan-carlos.jpg",
    twitter: "@dany",
    notes:
      "Queen Daenerys I Targaryen, also known as Daenerys Stormborn, and affectionately known as Dany, was the only daughter of King Aerys II Targaryen and Queen Rhaella, and the younger sister of Rhaegar and Viserys Targaryen.",
    favorite: false,
  },
  kpRHZTg: {
    first: "Samwell",
    last: "Tarly",
    avatar:
      "https://pbs.twimg.com/profile_images/966716212649578501/Z6TJXzI5_400x400.jpg",
    twitter: "@sam",
    notes:
      "Samwell, born Samwell Tarly, and often called Sam, is Jon Snow's closest friend, the eldest son of Lord Randyll Tarly and Lady Melessa Tarly of Horn Hill, and the older brother of Dickon and Talla Tarly.",
    favorite: true,
  },
};

const blanks = {
  Z3FYfr3J: {
    first: "",
    last: "",
    avatar: "",
    twitter: "",
    notes: "",
    favorite: true,
  },
  CI63o94m: {
    first: "",
    last: "",
    avatar: "",
    twitter: "",
    notes: "",
    favorite: true,
  },
  Idkcmgg5: {
    first: "",
    last: "",
    avatar: "",
    twitter: "",
    notes: "",
    favorite: true,
  },
  sMqwpijK: {
    first: "",
    last: "",
    avatar: "",
    twitter: "",
    notes: "",
    favorite: true,
  },
  jqJO6XuC: {
    first: "",
    last: "",
    avatar: "",
    twitter: "",
    notes: "",
    favorite: true,
  },
};
