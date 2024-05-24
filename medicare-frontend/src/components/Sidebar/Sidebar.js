import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import React, { useEffect } from "react";
import logoImage from "./medicare_logo.png";
import {
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  CardFooter,
  Avatar,
  Tooltip,
  Card,
  CardHeader,
  CardBody,
  Button,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Select,
  Option,
  Input,
  IconButton,
  Drawer,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  PencilIcon,
  UserPlusIcon,
  BanknotesIcon,
  CreditCardIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  LayoutDashboard,
  Home,
  StickyNote,
  Layers,
  Flag,
  Calendar,
  LifeBuoy,
  Settings,
} from "lucide-react";

import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  const role = localStorage.getItem("role");
  const headToDashboard = () => {
    if (role === "admin") navigate("/admin/dashboard");
    else if (role === "doctor") navigate("/doctor/patients");
    else if (role === "secretary") navigate("/patients");
  };
  const headToAppointments = () => {
    if (role === "doctor") navigate("/doctor/rdv");
    else if (role === "secretary" || role == "admin") navigate("/rdv");
  };
  const headToPatients = () => {
    if (role === "doctor") navigate("/doctor/patients");
    else if (role === "secretary" || role == "admin") navigate("/patients");
  };
  const headToPayments = () => {
    navigate("/payments");
  };

  return (
    <>
      <aside
        className={`h-screen left-0 ${
          expanded ? "w-fit" : "w-16"
        } transition-all sm:h-20 sm:fixed sm:w-screen sm:top-0 sidebar-size:w-14`}
      >
        <nav
          className={`h-full flex flex-col bg-white border-r shadow-sm  sm:flex-row`}
        >
          <div className="p-4 pb-2 flex justify-between items-center sm:hidden">
            <img
              src={logoImage}
              className={`overflow-hidden  ${
                expanded ? "w-32" : "w-0"
              } transition-all`}
            />
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>

          <List className="sm:flex-row mt-12">
            <div onClick={() => headToDashboard()} className="flex">
              <ListItem className={`${expanded ? "" : "w-11"} `}>
                <ListItemPrefix>
                  <InboxIcon className="h-5 w-5" />
                </ListItemPrefix>
                {expanded ? "Dashboard" : ""}
              </ListItem>
            </div>
            {role === "admin" && (
              <div onClick={() => headToDashboard()} className="flex">
                <ListItem className={`${expanded ? "" : "w-11"} `}>
                  <ListItemPrefix>
                    <InboxIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  {expanded ? "Utilisateurs" : ""}
                </ListItem>
              </div>
            )}
            <div onClick={() => headToPatients()} className="flex">
              <ListItem className={`${expanded ? "" : "w-11"} `}>
                <ListItemPrefix>
                  <InboxIcon className="h-5 w-5" />
                </ListItemPrefix>
                {expanded ? "Patients" : ""}
              </ListItem>
            </div>
            <div onClick={() => headToAppointments()} className="flex">
              <ListItem className={`${expanded ? "" : "w-11"} `}>
                <ListItemPrefix>
                  <UserCircleIcon className="h-5 w-5" />
                </ListItemPrefix>
                {expanded ? "Rendez-vous" : ""}
              </ListItem>
            </div>
            <div onClick={() => headToPayments()} className="flex">
              <ListItem className={`${expanded ? "" : "w-11"} `}>
                <ListItemPrefix>
                  <Cog6ToothIcon className="h-5 w-5" />
                </ListItemPrefix>
                {expanded ? "Paiements" : ""}
              </ListItem>
            </div>

            {/* {role === "doctor" && (
              <div onClick={() => headToDashboard()} className="flex">
                <ListItem className={`${expanded ? "" : "w-11"} `}>
                  <ListItemPrefix>
                    <InboxIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  {expanded ? "Patients" : ""}
                </ListItem>
              </div>
            )} */}
            <div onClick={() => Logout()} className="flex">
              <ListItem className="">
                <ListItemPrefix>
                  <PowerIcon className="h-5 w-5" />
                </ListItemPrefix>
                {expanded ? "Deconnexion" : ""}
              </ListItem>
            </div>
          </List>
        </nav>
      </aside>
    </>
  );
}

export function SidebarItem({ icon, text, active, alert }) {
  const { expanded } = useContext(SidebarContext);
  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
      }`}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        ></div>
      )}

      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </li>
  );
}
