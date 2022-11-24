import { html, render } from "lit";
import { Root } from "./routes/root";
import { Index } from "./routes/index";
import { Contact } from "./routes/contact";
import { Edit } from "./routes/edit";
import "./index.css";

const defaultContacts = [
  {
    id: "FQvd3Xc9",
    first: "Eddard",
    last: "Stark",
    avatar:
      "https://i.pinimg.com/originals/f2/76/59/f276599c999649d313658bea301c1e7b.jpg",
    twitter: "@ned",
    notes:
      "Lord Eddard Stark, also known as Ned Stark, was the head of House Stark, the Lord of Winterfell and Warden of the North, and later Hand of the King to King Robert I Baratheon.",
    favorite: true,
    createdAt: Date.now(),
  },
  {
    id: "ReylCDLZ",
    first: "Cersei",
    last: "Lannister",
    avatar:
      "https://c4.wallpaperflare.com/wallpaper/85/137/121/tv-show-game-of-thrones-cersei-lannister-lena-headey-wallpaper-preview.jpg",
    twitter: "@cersei",
    notes:
      "Queen Cersei I Lannister was the twentieth ruler of the Seven Kingdoms and the widow of King Robert Baratheon.",
    favorite: false,
    createdAt: Date.now(),
  },
  {
    id: "egAXtEMU",
    first: "Tyrion",
    last: "Lannister",
    avatar:
      "https://cdnb.artstation.com/p/assets/images/images/042/046/073/large/sungwoo-jo-14.jpg",
    twitter: "@tyrion",
    notes:
      "Lord Tyrion Lannister is the youngest child of Lord Tywin Lannister and younger brother of Cersei and Jaime Lannister.",
    favorite: true,
    createdAt: Date.now(),
  },
  {
    id: "EQjaffe1",
    first: "Danaerys",
    last: "Targaryen",
    avatar:
      "https://i.pinimg.com/736x/da/88/6d/da886de0b3e3ac7a70afd3f9ca9e9e3e--daenerys-targaryen-juan-carlos.jpg",
    twitter: "@dany",
    notes:
      "Queen Daenerys I Targaryen, also known as Daenerys Stormborn, and affectionately known as Dany, was the only daughter of King Aerys II Targaryen and Queen Rhaella, and the younger sister of Rhaegar and Viserys Targaryen.",
    favorite: false,
    createdAt: Date.now(),
  },
  {
    id: "kpRHZTg",
    first: "Samwell",
    last: "Tarly",
    avatar:
      "https://pbs.twimg.com/profile_images/966716212649578501/Z6TJXzI5_400x400.jpg",
    twitter: "@sam",
    notes:
      "Samwell, born Samwell Tarly, and often called Sam, is Jon Snow's closest friend, the eldest son of Lord Randyll Tarly and Lady Melessa Tarly of Horn Hill, and the older brother of Dickon and Talla Tarly.",
    favorite: true,
    createdAt: Date.now(),
  },
];

// Seed the "database", if necessary.
// Using localStorage rather than localforage here
// so it's synchronous.
let contacts = localStorage.getItem("contacts");
if (contacts === null) {
  console.log("Seeding database with default contacts.");
  localStorage.setItem("contacts", JSON.stringify(defaultContacts));
} else {
  console.log("Contacts found.");
}

customElements.define("root-route", Root);
customElements.define("index-route", Index);
customElements.define("contact-route", Contact);
customElements.define("edit-route", Edit);

render(
  html`<root-route>
    <index-route slot="index"></index-route>
    <contact-route slot="contact-view"></contact-route>
    <edit-route slot="contact-edit"></edit-route>
    <div id="error-page" slot="error">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
    </div>
  </root-route>`,
  document.getElementById("root")!
);
