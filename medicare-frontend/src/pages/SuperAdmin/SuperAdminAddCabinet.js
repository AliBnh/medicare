import React, { useState, useEffect} from "react";
import { SidebarItem } from "../../components/Sidebar/Sidebar";
import { BrowserRouter as Router, Route,Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logoImage from './medicare_logo.png';

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/solid";



import {
    Checkbox,
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

function SuperAdminAddCabinet() {

  const [codeCabinet, setCodeCabinet] = useState('');
  const [mdpCabinet, setMdpCabinet] = useState('');
  const [mailCabinet, setMailCabinet] = useState('');
  const [villeCabinet, setVilleCabinet] = useState('');
  const [zipcodeCabinet, setZipcodeCabinet] = useState('');
  const [adresseCabinet, setAdresseCabinet] = useState('');
  const [phoneCabinet, setPhoneCabinet] = useState('');
  const [logoCabinet, setLogoCabinet] = useState('');
  const [mailAdmin, setMailAdmin] = useState('');
  const [mdpAdmin, setMdpAdmin] = useState('');

  const navigate = useNavigate();



  const handleAddCabinet = async () => {
    try {
      const response = await axios.post('http://localhost:3001/clinics', {
          code: codeCabinet,
          address: adresseCabinet,
          phone: phoneCabinet,
          email: mailCabinet,
          password: mdpCabinet,
          city: villeCabinet,
          postal_code: zipcodeCabinet,
          logo: logoCabinet,
          adminEmail: mailAdmin,
          adminPassword: mdpAdmin,
      });
      
      if (response.status === 200) {
        navigate('/superAdmin/dashboard');
      } else {
        console.log('erreur de connexion');
      }
    } catch (error) {
      console.error('error:', error);
    }
  };



  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3001/logout');
      navigate('/superAdmin/login');

    } catch (error) {
      console.error('error:', error);
    }
  };

  return (
    
    <div className="backdrop-blur-none relative transition duration-500 ease-in-out w-screen h-screen flex justify-start items-start">
      <div className="flex w-full h-full sm:h-fit flex-col transition duration-500 ease-in-out transform  justify-center items-start bg-white py-4 px-16 sm:px-4">
      <Navbar className="z-50 sticky shadow-none top-0 max-w-screen-xl py-1 px-0 lg:py-1">
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
            <div className="flex px-16 pt-4 justify-start items-center gap-2">
                <Typography variant="h4" color="gray" className="opacity-50">
                  Cabinets 
                </Typography>
                <ChevronDownIcon
                  strokeWidth={4}
                  className="h-5 w-5 transition-transform -rotate-90 opacity-50"
                />
                <Typography variant="h4" color="gray">
                  Ajouter cabinet 
                </Typography>
            </div>
            <div className="bg-white rounded p-4 px-8 md:p-8 mb-6 m-8">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2">
                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-2 sm:grid-cols-1">
                    <div className="">
                      <label className="flex" htmlFor="code-cabinet">Code du cabinet</label>
                      <input type="text" name="code-cabinet" id="code-cabinet" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="code cabinet" value={codeCabinet} onChange={(e) => setCodeCabinet(e.target.value)}/>
                    </div>
                    <div className="">
                      <label className="flex" htmlFor="mdp-cabinet">Mot de passe du cabinet</label>
                      <input type="password" name="mdp-cabinet" id="mdp-cabinet" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  placeholder="********" value={mdpCabinet} onChange={(e) => setMdpCabinet(e.target.value)}/>
                    </div>
                    <div className="">
                      <label className="flex" htmlFor="mail-cabinet">Adresse mail</label>
                      <input type="text" name="mail-cabinet" id="mail-cabinet" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" value={mailCabinet} onChange={(e) => setMailCabinet(e.target.value)}/>
                    </div>
                    <div className="">
                      <label className="flex" htmlFor="ville-cabinet">Ville</label>
                      <input type="text" name="ville-cabinet" id="ville-cabinet" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" value={villeCabinet} onChange={(e) => setVilleCabinet(e.target.value)}/>
                    </div>
                    <div className="">
                      <label className="flex" htmlFor="zipcode-cabinet">Code postal</label>
                      <input type="text" name="zipcode-cabinet" id="zipcode-cabinet" className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" value={zipcodeCabinet} onChange={(e) => setZipcodeCabinet(e.target.value)}/>
                    </div>
                    <div className="">
                      <label className="flex" htmlFor="adresse-cabinet">Adresse</label>
                      <input type="mail" name="adresse-cabinet" id="adresse-cabinet" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" value={adresseCabinet} onChange={(e) => setAdresseCabinet(e.target.value)}/>
                    </div>
                    <div className="">
                      <label className="flex" htmlFor="phone-cabinet">Numéro de téléphone</label>
                      <input type="text" name="phone-cabinet" id="phone-cabinet" className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" value={phoneCabinet} onChange={(e) => setPhoneCabinet(e.target.value)}/>
                    </div>
                    <div>
                      <label className="flex" htmlFor="logo-cabinet">Logo du cabinet</label>
                      <input
                        type="file"
                        title="Choisir un fichier"
                        placeholder="Choisir un fichier"
                        name="logo-cabinet"
                        id="logo-cabinet"
                        className="border rounded-md w-full mt-1 file:h-10 text-sm text-slate-500
                            file:mr-4 file:py-2 file:px-4 file:rounded
                            file:border-0 file:text-sm file:font-semibold
                            file:bg-login-color file:text-submit-color
                            hover:file:bg-blue-100
                            bg-gray-50"
                            value={logoCabinet} onChange={(e) => setLogoCabinet(e.target.value)}/>
                    </div>
                    <div className="">
                      <label className="flex" htmlFor="mail-admin">Adresse mail Admin</label>
                      <input type="mail" name="mail-admin" id="mail-admin" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" value={mailAdmin} onChange={(e) => setMailAdmin(e.target.value)}/>
                    </div>
                    <div className="">
                      <label className="flex" htmlFor="mdp-admin">Mot de passe Admin</label>
                      <input type="password" name="mdp-admin" id="mdp-admin" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  placeholder="********" value={mdpAdmin} onChange={(e) => setMdpAdmin(e.target.value)}/>
                    </div>
                  </div>
                  <div className="flex w-full flex-row justify-end gap-1 my-4">
                      <Button onClick={() => {navigate('/superAdmin/dashboard')}} variant="outlined" color="gray">Annuler</Button>
                      <Button onClick={handleAddCabinet} variant="filled">Ajouter Cabinet</Button>
                  </div>
                </div>
              </div>
            </div>
        </Card>

      </div>
      
    </div>
  
  );
}

export default SuperAdminAddCabinet;
