import DoodlePerson from "../svg/DoodlePerson/DoodlePerson.jsx";
import DoodleBriefcase from "../svg/DoodleBriefcase/DoodleBriefcase.jsx";
import DoodlePhone from "../svg/DoodlePhone/DoodlePhone.jsx";
import DoodleDocument from "../svg/DoodleDocument/DoodleDocument.jsx";

export const NAV_ITEMS = [
  { key: "about", label: "About", Icon: DoodlePerson, color: "yellow", sectionId: "about" },
  { key: "projects", label: "Projects", Icon: DoodleBriefcase, color: "cyan", sectionId: "projects" },
  { key: "contact", label: "Contact", Icon: DoodlePhone, color: "green", sectionId: "contact" },
  { key: "cv", label: "CV", Icon: DoodleDocument, color: "pink", href: "/cv/cv.pdf" },
];

export const NAV_SECTION_IDS = NAV_ITEMS
  .filter((item) => item.sectionId)
  .map((item) => item.sectionId);
