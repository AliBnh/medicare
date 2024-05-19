import React, { useState, useEffect, useRef} from "react";
import html2pdf from "html2pdf.js";
import Sidebar from "../../components/Sidebar/Sidebar";
import { SidebarItem } from "../../components/Sidebar/Sidebar";
import { BrowserRouter as Router, Route, Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { WalletMinimal, Users, Hospital, TrashIcon } from "lucide-react";
import { useCountries } from "use-react-countries";
import axios from "axios";
import jsPDF from "jspdf";


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

   

function SecretaryConsultation() {


    let { rdvId } = useParams();

    const [users, setUsers] = useState([]);
    const [docs, setDocs] = useState([]);

  const navigate = useNavigate();

  const [clinicDb, setClinicDb] = useState([]);


  const contentRef = useRef(null);

  const handleDownloadPDF = () => {
    const opt = {
      margin: 0,
      filename: "document.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().from(contentRef.current).set(opt).save();
  };
  
  
  

  const cdb = localStorage.getItem('clinic-database');
  useEffect(() => {
    const token = localStorage.getItem('access-token');
    const role = localStorage.getItem('role');
    const clinicDb = localStorage.getItem('clinic-database');

    const fetchUsers = async () => {
      const token = localStorage.getItem('access-token');
      const role = localStorage.getItem('role');
      setClinicDb(cdb);
      if(cdb){
        try {
          axios.get('http://localhost:3002/patients', {
              headers: {
                  // 'Authorization': Bearer ${token} ,
                  'access-token': token ,
                  'clinic-database': cdb ,
                  'role' : role
              }
          })
          .then(response => {
              //console.log(response.data[0].role);
                
                if(response.data){
                    setUsers(response.data);
                    const doctors = response.data.filter(user => user.role === "doctor");
                    setDocs(doctors);
                }
                console.log(users);
          })
          .catch(error => {
              console.log(error);
          });
        } catch (error) {
          console.log("Token d'authentification non disponible.");
        }
      }
    };
  
    fetchUsers();
  }, []);

  useEffect(() => {
    const clinicDb = localStorage.getItem('clinic-database');

      const token = localStorage.getItem('access-token');
      const role = localStorage.getItem('role');
      setClinicDb(cdb);
      if(cdb){
        try {
          axios.get('http://localhost:3002/users', {
              headers: {
                  // 'Authorization': Bearer ${token} ,
                  'access-token': token ,
                  'clinic-database': cdb ,
                  'role' : role
              }
          })
          .then(response => {
              //console.log(response.data[0].role);
                
                if(response.data){
                    const doctors = response.data.filter(user => user.role === "doctor");
                    setDocs(doctors);
                }
                console.log(users);
          })
          .catch(error => {
              console.log(error);
          });
        } catch (error) {
          console.log("Token d'authentification non disponible.");
        }
      }
  
  }, []);


  const [text, setText] = useState();
  const [motifConsultation, setMotifConsultation] = useState();
  

  

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
        <Card className="h-full w-full rounded-none">
          <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Consultation pour : {rdvId}
              </Typography>
            </div>
          </div>
         
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <h1 class="text-3xl mb-5">Details Consultation :</h1>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                Motif Consultation
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="" value={motifConsultation} onChange={(e) => setMotifConsultation(e.target.value)}/>
              {/* <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> */}
            </div>
            <div>
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password" >
                Examen Clinique
              </label>
              <select name="roler" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                <option value="">Choisir</option>
                <option value="">Examen 1</option>
                <option value="">Examen 2</option>
                <option value="">Examen 3</option>
                <option value="">Examen 4</option>
              </select>
            </div>
            <div>
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password" >
                Resultat de l'examen clinique
              </label>
              <textarea class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text"></textarea>

              {/* <textarea class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" ></textarea> */}
              {/* <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> */}
            </div>
            <div>
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password" >
              Resultat de l'examen paraclinique
              </label>
              <textarea class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text"></textarea>
              {/* <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> */}
            </div>
            </div>

          <div class="grid grid-cols-7 gap-2">
            <div>
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password" >
                DiabÃ©te
              </label>
              <select name="roler" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                <option value="">choisir</option>
                <option value="">Oui</option>
                <option value="">Non</option>
              </select>
            </div>
            <div>
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password" >
                HTA
              </label>
              <select name="roler" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                <option value="">choisir</option>
                <option value="">Oui</option>
                <option value="">Non</option>
              </select>
            </div>
            <div>
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password" >
                Tabac
              </label>
              <select name="roler" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                <option value="">choisir</option>
                <option value="">Oui</option>
                <option value="">Non</option>
              </select>
            </div>
            <div>
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password" >
                Ac . urique
              </label>
              <select name="roler" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                <option value="">choisir</option>
                <option value="">Oui</option>
                <option value="">Non</option>
              </select>
            </div>
            <div>
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password" >
                Alcool
              </label>
              <select name="roler" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                <option value="">choisir</option>
                <option value="">Oui</option>
                <option value="">Non</option>
              </select>
            </div>
            <div>
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password" >
                DysliploÃ©mie
              </label>
              <select name="roler" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                <option value="">choisir</option>
                <option value="">Oui</option>
                <option value="">Non</option>
              </select>
            </div>
            <div>
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password" >
                ObÃ©sitÃ©
              </label>
              <select name="roler" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                <option value="">choisir</option>
                <option value="">Oui</option>
                <option value="">Non</option>
              </select>
            </div>




          </div>


          <div class="grid grid-cols-1 gap-2">

          </div>
          <div className="w-full bg-white shadow-md rounded-md p-8 flex flex-col items-start" ref={contentRef}>
            <h1 className="text-2xl font-bold mb-4">Consultation :</h1>
            <p className="text-lg mb-4"><b>Motif de consultation: </b>{motifConsultation}</p>
            <p className="text-lg">
              exemplesdkjnsjkdnfskdnkjsndfk
            </p>
          </div>
          <button
            className="mt-8 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={handleDownloadPDF}
          >
            Download PDF
          </button>
        </CardBody>
        </Card>
    </div>

  );
}

export default SecretaryConsultation;
