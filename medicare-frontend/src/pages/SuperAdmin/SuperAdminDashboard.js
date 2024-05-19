import React, { useState, useEffect} from "react";
import { SidebarItem } from "../../components/Sidebar/Sidebar";
import { BrowserRouter as Router, Route,Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import logoImage from './medicare_logo.png';

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, PlusIcon , TrashIcon} from "@heroicons/react/24/solid";



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
    Navbar,
    MobileNav,
    Button,
    IconButton,
    Input,
    Drawer,
    CardHeader,
    CardBody,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    Tooltip,
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

function SuperAdminDashboard() {

  const [idToDelete, setIdToDelete] = useState();
  const [clinics, setClinics] = useState([]);

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const response = await axios.get('http://localhost:3001/clinics');
        if (response.data) {
          setClinics(response.data); 
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchClinics();
  }, []);
  
  //console.log(clinics);

    const [openNav, setOpenNav] = React.useState(false);
 
   

    const navigate = useNavigate();

    const handleLogout = async () => {
      try {
        await axios.post('http://localhost:3001/logout');
        navigate('/superAdmin/login');

      } catch (error) {
        console.error('error:', error);
      }
    };

    const handleAddButton = () => {
      navigate('/superAdmin/ajouterCabinet');
    }

    const handleCancel = () => {
      setIdToDelete(null);
    };

    const handleDelete = (id) => {
      if(id){
        try {
          axios.delete(`http://localhost:3001/clinics/${id}`);
          window.location.reload();
        } catch (error) {
          console.error(error);
        }
      }
    }

    const handleDeleteConfirmation = () => {
      handleDelete(idToDelete);
      setIdToDelete(null);
    };

    

    
    


    const TABLE_HEAD = ["Cabinet", "Adresse", "Email", "Fix", "Code postal", "Actions"];
 
    const TABLE_ROWS = clinics;

  return (
    
    <div className="backdrop-blur-none relative transition duration-500 ease-in-out transform w-screen h-screen flex justify-center items-center">
      <div className="flex w-full h-full overflow-hidden lg:h-full flex-col transition duration-500 ease-in-out transform  justify-center items-start bg-white py-4 px-16 sm:px-4">
        <Navbar className="z-10 sticky shadow-none top-0 max-w-screen-xl py-1 px-0 lg:py-1">
          <div className="container flex flex-row items-center justify-between text-blue-gray-900">
            <div className="w-full flex items-start justify-start mt-1">
              <img className=" h-10 -ml-2" src={logoImage} alt="Logo"/>
            </div>
            <div className="container mx-auto flex justify-end">
              <div className="flex items-center gap-x-1 mt-1">
                <Button onClick={handleLogout} variant="gradient" size="md" className="" color="red">
                  <span>Deconnexion</span>
                </Button>
              </div>
            </div>
          </div>
          
        </Navbar>

        <Card className="h-full w-full mt-10">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
                <div>
                    <Typography variant="h4" color="blue-gray">
                      Cabinets
                    </Typography>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                    <Button onClick={handleAddButton} className="flex items-center gap-3 border-blue border" color="indigo">
                        <PlusIcon strokeWidth={2} className="h-4 w-4" />
                        Ajouter un cabinet
                    </Button>
                </div>
            </div>
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="w-full mb-8">
                <Input
                  label="Rechercher un cabinet"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
            </div>
          </CardHeader>
          <CardBody className="overflow-scroll px-0">
          {clinics ? (
            <table className="mt-4 w-full min-w-max table-auto text-left border rounded-xl	">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map(
                  ({ code,address, email, phone, postal_code, id }, index) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";
                
                    return (
                      <tr key={id}>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                Cabinet{code}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {address}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="w-max">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal opacity-70"
                                >
                                {email}
                              </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {phone}
                          </Typography>
                        </td>
                        <td className={classes}>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                            >
                                {postal_code}
                            </Typography>
                        </td>
                        <td className={classes}>
                          <div className="flex items-center justify-start gap-0">
                            <Button
                              size="sm"
                              variant="text"
                              className="flex items-center gap-2"
                            >
                              <PencilIcon className="h-4 w-4 text-gray-600" />
                              <Typography className="!font-semibold text-xs text-gray-600 sm:hidden block">
                                Modifier
                              </Typography>
                            </Button>
                            <Button
                              onClick={() => setIdToDelete(id)}
                              size="sm"
                              variant="text"
                              color="red"
                              className="flex items-center gap-2"
                            >
                              <TrashIcon className="h-4 w-4 text-red-500" />
                              <Typography className="!font-semibold text-xs text-red-500 sm:hidden block">
                                Supprimer
                              </Typography>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  },
                )}
              </tbody>
            </table>
          ) : (
            <div class="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
              <svg class="text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24">
                <path
                  d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                  stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>
                <path
                  d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                  stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" class="text-gray-900">
                </path>
              </svg>
            </div>
          )

          }
            
          </CardBody>
          <CardFooter className="flex items-center justify-between border-blue-gray-50 p-4 pt-0 mb-4">
            <Typography variant="small" color="blue-gray" className="font-normal">
              Page 1 de 10
            </Typography>
            <div className="flex gap-2">
              <Button variant="outlined" size="sm">
                Précédant
              </Button>
              <Button variant="outlined" size="sm">
                Suivant
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>



      {/* l popup li tiban fach katbghi t supprimer cabinet */}
      {idToDelete && (
        <div className="relative z-20" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className=" flex min-h-full items-center justify-center p-4 text-center lg:items-center lg:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all 2xl:my-8 2xl:w-full 2xl:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 lg:p-6 lg:pb-4">
                  <div className="2xl:flex justify-start 2xl:items-start">
                    <div className="mt-3 mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 lg:mx-0 lg:h-10 lg:w-10">
                      <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                      </svg>
                    </div>
                    <div className="mt-2 text-center 2xl:ml-4 sm:mt-0 2xl:text-left">
                      <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Supprimer cabinet</h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">Etes-vous sûr de vouloir <b>supprimer</b> ce cabinet ? Toutes ses données seront définitivement supprimées. Cette action ne peut pas être annulée.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 2xl:flex 2xl:flex-row-reverse 2xl:px-6">
                  <button onClick={handleDeleteConfirmation} type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 2xl:ml-3 2xl:w-auto">Supprimer</button>
                  <button onClick={handleCancel} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 2xl:mt-0 2xl:w-auto">Annuler</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
    </div>
  
  );
}

export default SuperAdminDashboard;
