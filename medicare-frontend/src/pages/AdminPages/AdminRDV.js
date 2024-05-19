import React, { useState, useEffect} from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { SidebarItem } from "../../components/Sidebar/Sidebar";
import { BrowserRouter as Router, Route,Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import docsImage from './admin.png';
import logoImage from './medicare_logo.png';
import { WalletMinimal, Users, Hospital } from "lucide-react";
import { useCountries } from "use-react-countries";


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
  Drawer
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
import { LayoutDashboard, Home, StickyNote, Layers, Flag, Calendar, LifeBuoy, Settings } from "lucide-react";

   

function AdminRDV() {


  const navigate = useNavigate();

  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [idToDelete, setIdToDelete] = useState();

  const TABS = [
    {
      label: "Docteurs",
      value: "docteurs",
    },
    {
      label: "Secrétaire",
      value: "secretaire",
    },
    {
      label: "Patients",
      value: "patients",
    },
  ];

  const baseData = [
    {
      TaskID: 4,
      OwnerID: 2,
      Title: "Bowling tournament",
      Start: "2023-06-24T16:00:00.000Z",
      End: "2023-06-24T19:00:00.000Z",
      isAllDay: false,
    },
    {
      TaskID: 5,
      OwnerID: 2,
      Title: "Take the dog to the vet",
      Start: "2023-06-24T12:00:00.000Z",
      End: "2023-06-24T13:00:00.000Z",
      isAllDay: false,
    },
    {
      TaskID: 6,
      OwnerID: 2,
      Title: "Call Charlie about the project",
      Start: "2023-06-21T11:30:00.000Z",
      End: "2023-06-21T13:00:00.000Z",
      isAllDay: false,
    },
    {
      TaskID: 7,
      OwnerID: 3,
      Title: "Meeting with Alex",
      Start: "2023-06-22T14:00:00.000Z",
      End: "2023-06-22T16:00:00.000Z",
      isAllDay: false,
    },
    {
      TaskID: 9,
      OwnerID: 2,
      Title: "Alex's Birthday",
      Start: "2023-06-18T13:00:00.000Z",
      End: "2023-06-18T14:00:00.000Z",
      isAllDay: true,
    },
  ];

  const TABLE_HEAD = ["Membre", "email", "Fonction", "Téléphone", "Actions",];

  const TABLE_ROWS = [
    {
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
      name: "BENHIMA Salah",
      email: "bnhhali@gmail.com",
      job: "Manager",
      org: "Organization",
      online: true,
      date: "0736382678",
    },
    {
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
      name: "BACHA Zinelabidine",
      email: "bacha@gmail.com",
      job: "Programator",
      org: "Developer",
      online: false,
      date: "0736382678",
    },
    {
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
      name: "ELBHIHE Hamza",
      email: "elbhihehamza@gmail.com",
      job: "Executive",
      org: "Projects",
      online: false,
      date: "0736382678",
    },
    {
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
      name: "BLJ Anass",
      email: "bljanass@gmail.com",
      job: "Programator",
      org: "Developer",
      online: true,
      date: "0736382678",
    },
    {
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
      name: "RAMI Salah",
      email: "ramisalah@gmail.com",
      job: "Manager",
      org: "Executive",
      online: false,
      date: "0736382678",
    },
  ];
  
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const handleDeleteConfirmation = () => {
    setIdToDelete(null);
  };

  return (
    
    <div className="backdrop-blur-none	 bg-login-color transition duration-500 ease-in-out w-screen h-screen flex justify-center items-center">
        <Sidebar>
          <SidebarItem icon={<Home size={20} />} text="Accueil" alert />
          <SidebarItem icon={<Users size={20} />} text="Utilisateurs" active />
          <SidebarItem icon={<Hospital size={20} />} text="Patients" alert />
          <SidebarItem icon={<Calendar size={20} />} text="Rendez-vous" />
          <SidebarItem icon={<WalletMinimal size={20} />} text="Paiements" />
          <hr className="my-3" />
        </Sidebar>
        
        {idToDelete && (
            <div className="relative z-20" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className=" flex min-h-full items-center justify-center p-4 text-center lg:items-center lg:p-0">
                  <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all 2xl:my-8 2xl:w-full 2xl:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 lg:p-6 lg:pb-4">
                      <div className="2xl:flex justify-start 2xl:items-start">
                        <form class="w-full max-w-2xl">
                          <div class="flex  mx-3 mb-6">
                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                Prénom
                              </label>
                              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="MED"/>
                              {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
                            </div>
                            <div class="w-full md:w-1/2 px-3">
                              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                Nom
                              </label>
                              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="SIX"/>
                            </div>
                          </div>
                          <div class="flex mx-3 mb-6">
                            <div class="w-full px-3">
                              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                Email
                              </label>
                              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="email" placeholder="exemple@gmail.com"/>
                              {/* <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> */}
                            </div>
                          </div>
                          <div class="flex mx-3 mb-2">
                            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                Mot de passe
                              </label>
                              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************"/>
                              {/* <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> */}
                            </div>
                            <div class="w-4/6 px-3 mb-6 md:mb-0">
                              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                                Rôle
                              </label>
                              <div class="relative">
                                <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                  <option>Choisir</option>
                                  <option>Docteur</option>
                                  <option>Secrétaire</option>
                                </select>
                                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 2xl:flex 2xl:flex-row-reverse 2xl:px-6">
                      <button onClick={handleDeleteConfirmation} type="button" className="inline-flex w-full justify-center rounded-md bg-super-admin-submit px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-900 2xl:ml-3 2xl:w-auto">Enregistrer</button>
                      <button onClick={handleDeleteConfirmation} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 2xl:mt-0 2xl:w-auto">Annuler</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )}
    </div>

  );
}

export default AdminRDV;
