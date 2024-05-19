import React, { useState, useEffect} from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { SidebarItem } from "../../components/Sidebar/Sidebar";
import { BrowserRouter as Router, Route,Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logoImage from './medicare_logo.png';
import adminImage from './admin.png';
import docImage from './doc.png';
import secImage from './sec.png';

import { Input, IconButton, Drawer } from "@material-tailwind/react";

import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { LayoutDashboard, Home, StickyNote, Layers, Flag, Calendar, LifeBuoy, Settings } from "lucide-react";


function ChoicePage() {

  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  const navigate = useNavigate();
  
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    
    <div className="backdrop-blur-none	 bg-login-color transition duration-500 ease-in-out w-screen h-screen flex justify-center items-center">
      
      <div className=" flex w-full h-full sm:h-full flex-row transition duration-500 ease-in-out sm:flex-col  justify-center items-center bg-admin-hover p-5 sm:p-2">
        <div className="w-full flex flex-1 max-w-4xl rounded-xl bg-white items-center justify-center flex-col p-5 lg:p-2 mx-4  my-0 shadow-2xl">
            <div className="w-full flex flex-col items-center justify-center my-6 gap-5">
                {/* <img className="w-1/2" src={logoImage} alt="Logo"/> */}
                <label className="border-2 w-2/6 h-12 flex items-center justify-center">Logo du cabinet</label>
                <Typography className=" text-admin-hover" variant="h5" color="">
                    Veuillez choisir votre rôle
                </Typography>
                <div className="w-full h-full flex flex-row items-center justify-between gap-4 p-8">
                    <div onClick={()=>{navigate("/admin/login")}} className="w-1/3 border-2 rounded-md border-admin-hover flex flex-col items-center justify-center p-2 hover:cursor-pointer hover:scale-105 ease-linear duration-100">
                        <img className="w-full" src={adminImage} alt="Logo"/>
                        <Typography className="text-super-admin-submit-hover" variant="h5" color="">
                            Admin
                        </Typography>
                    </div>
                    <div onClick={()=>{navigate("/doctor/login")}} className="w-1/3 border-2 rounded-md border-admin-hover flex flex-col items-center justify-center p-2 hover:cursor-pointer hover:scale-105 ease-linear duration-100">
                        <img className="w-full" src={docImage} alt="Logo"/>
                        <Typography className="text-super-admin-submit-hover" variant="h5" color="">
                            Docteur
                        </Typography>
                    </div>
                    <div onClick={()=>{navigate("/secretaire/login")}} className="w-1/3 border-2 rounded-md border-admin-hover flex flex-col items-center justify-center p-2 hover:cursor-pointer hover:scale-105 ease-linear duration-100">
                        <img className="w-full" src={secImage} alt="Logo"/>
                        <Typography className="text-super-admin-submit-hover" variant="h5" color="">
                            Secrétaire
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>

  );
}

export default ChoicePage;
