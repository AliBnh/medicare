import React, { useState, useEffect} from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { SidebarItem } from "../../components/Sidebar/Sidebar";
import { BrowserRouter as Router, Route,Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import docsImage from './sec.png';
import logoImage from './medicare_logo.png';
import axios from "axios";

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


function SecretaryLoginPage() {

 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  function loginByRole(){
    const token = localStorage.getItem('access-token-clinic');
    const clinic_database = localStorage.getItem('clinic-database');
    console.log(clinic_database);

    axios.post('http://localhost:3002/loginByRole', {
        "email": email,
        "password": password,
        "role": "secretary",
    } , {
        headers : {
            "access-token-clinic": token ,
            "clinic-database" : clinic_database
        }
    })
    .then(function (response) {
        console.log(response);
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('id', response.data.id);
        localStorage.setItem('access-token', response.data.accessToken);
        navigate("/secretaire/dashboard");

    })
    .catch(function (error) {
        console.log(error);
    });
  }

  return (
    
    <div className="backdrop-blur-none	 bg-login-color transition duration-500 ease-in-out w-screen h-screen flex justify-center items-center">
      
      <div className=" flex w-full h-full sm:h-full flex-row transition duration-500 ease-in-out sm:flex-col  justify-center items-center  bg-login-color p-5 sm:p-2 ">
        <div className="flex flex-1 max-w-xl rounded-xl bg-white items-center justify-center flex-col p-5 lg:p-2 mx-4  my-0">
          <div className="w-full flex items-center justify-center my-6">
            <img className="w-1/2" src={logoImage} alt="Logo"/>
          </div>
          <div className="w-4/5 flex flex-col items-center justify-center gap-5">
            <div className="w-full flex flex-col items-start justify-start gap-2">
              {/* <label className="text-base font-semibold">Email</label> */}
              <Input size="lg" color="blue" type="email" label="Adresse mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="w-full flex flex-col items-start justify-start gap-2">
              {/* <label className="text-base font-semibold">Mot de passe</label> */}
              <Input size="lg" color="blue" type="password" label="Mot de passe" icon={<i className="fas fa-lock" />} value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div class="flex w-full items-center justify-start">
              <label class="relative flex items-center mr-1 rounded-full cursor-pointer" htmlFor="check">
                <input type="checkbox"
                  class="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                  id="check" />
                <span
                  class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                    stroke="currentColor" stroke-width="1">
                    <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"></path>
                  </svg>
                </span>
              </label>
              <label class="mt-px font-light text-gray-700 cursor-pointer select-none" htmlFor="check">
                Se souvenir de moi
              </label>
            </div> 
            <button onClick={loginByRole} className="mt-3 mb-6 w-full h-12 text-xl font-medium text-center text-white rounded-md border border-solid border-submit-color bg-admin-submit transition duration-500 ease-in-out hover:text-black hover:border-admin-hover hover:bg-admin-hover">
              Se connecter
            </button>
            
          </div>
        </div>
        <div className='flex-1 flex justify-center items-center '>
          <img className="w-full h-auto max-w-xl sm:max-w-md" src={docsImage} alt="Doctor"/>
        </div>
      </div>
    </div>

  );
}

export default SecretaryLoginPage;
