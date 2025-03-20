import { FaHome, FaListAlt, FaVideo, FaUsers } from "react-icons/fa";

const navBarItems = [
  {
    title: "Home",
    link: "/",
    icon: <FaHome />,
  },
  {
    title: "Charity",
    link: "/charity",
    icon: <FaListAlt />,
  },
  {
    title: "Scan QR",
    link: "/scan",
  },
  {
    title: "Community",
    link: "/community",
    icon: <FaUsers />,
  },
];

export default navBarItems;