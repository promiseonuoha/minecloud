import {
  faFolderClosed,
  faCircleUser,
  faHeart,
} from "@fortawesome/free-regular-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

export const navLinks = [
  {
    name: "Files",
    path: "/",
    icon: faFolderClosed,
  },
  {
    name: "Contact",
    path: "/contact&",
    icon: faCircleUser,
  },
];

export const sideBarLinks = [
  {
    icon: faFolderClosed,
    name: "All Files",
    path: "/",
    iconTwo: faAngleDown,
  },
  {
    icon: faHeart,
    name: "Favourites",
    path: "/favourite&",
  },
];

export const quickAccessLinks = [];

export const totalNavLinks = ["/contact&", "/favourites&"];
