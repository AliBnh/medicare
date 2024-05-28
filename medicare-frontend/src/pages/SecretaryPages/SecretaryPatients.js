import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { SidebarItem } from "../../components/Sidebar/Sidebar";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  WalletMinimal,
  Users,
  Hospital,
  TrashIcon,
  PlusCircle,
  BadgeInfo,
} from "lucide-react";
import { useCountries } from "use-react-countries";
import axios from "axios";

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

function SecretaryPatients() {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [idToDelete, setIdToDelete] = useState();
  const [isAddDisplayed, setIsAddDisplayed] = useState();

  const TABLE_HEAD = ["Nom", "Prénom", "CIN", "Téléphone", "Actions"];

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const [users, setUsers] = useState([]);
  const [clinicDb, setClinicDb] = useState([]);

  const handleCancel = () => {
    setDisplayed(0);
  };

  const cdb = localStorage.getItem("clinic-database");
  useEffect(() => {
    const token = localStorage.getItem("access-token");
    const role = localStorage.getItem("role");
    const clinicDb = localStorage.getItem("clinic-database");

    const fetchUsers = async () => {
      const token = localStorage.getItem("access-token");
      const role = localStorage.getItem("role");
      setClinicDb(cdb);
      if (cdb) {
        try {
          axios
            .get("http://localhost:3002/patients", {
              headers: {
                "access-token": token,
                "clinic-database": cdb,
                role: role,
              },
            })
            .then((response) => {
              if (response.data) {
                setUsers(response.data);
                const doctors = response.data.filter(
                  (user) => user.role === "doctor"
                );
                setDocs(doctors);
              }
            })
            .catch((error) => {
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
    const clinicDb = localStorage.getItem("clinic-database");

    const token = localStorage.getItem("access-token");
    const role = localStorage.getItem("role");
    setClinicDb(cdb);
    if (cdb) {
      try {
        axios
          .get("http://localhost:3002/users", {
            headers: {
              // 'Authorization': Bearer ${token} ,
              "access-token": token,
              "clinic-database": cdb,
              role: role,
            },
          })
          .then((response) => {
            //console.log(response.data[0].role);

            if (response.data) {
              const doctors = response.data.filter(
                (user) => user.role === "doctor"
              );
              setDocs(doctors);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log("Token d'authentification non disponible.");
      }
    }
  }, []);

  const TABLE_ROWS = users;

  const [nom, setNom] = useState();
  const [prenom, setPrenom] = useState();
  const [cin, setCin] = useState();
  const [phone, setPhone] = useState();
  const [selectedGender, setSelectedGender] = useState();
  const [date, setDate] = useState();
  const [docId, setDocId] = useState();
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [selectedInsurance, setSelectedInsurance] = useState();
  const [email, setEmail] = useState();
  const [displayed, setDisplayed] = useState();
  const [docs, setDocs] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState();
  const [selectedPatient, setSelectedPatient] = useState();
  const [selectedId, setSelectedId] = useState();
  const [selectedNom, setSelectedNom] = useState();
  const [selectedPrenom, setSelectedPrenom] = useState();
  const [selectedType, setSelectedType] = useState();
  const [patientId, setPatientId] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(users?.length / itemsPerPage) || 1;
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDocSelection = (event) => {
    setDocId(event.target.value);
  };

  const getVisiblePatients = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return users?.slice(startIndex, endIndex);
  };
  const handlePatientSelection = (event) => {
    setPatientId(event.target.value);
  };
  const handleTypeSelection = (event) => {
    setSelectedType(event.target.value);
  };

  const handleSelection = (event) => {
    setSelectedGender(event.target.value);
  };
  const handleInsuranceSelection = (event) => {
    setSelectedInsurance(event.target.value);
  };
  const handleDeleteUser = (UserIdDelete) => {
    const tokens = localStorage.getItem("access-token");
    const roles = localStorage.getItem("role");
    const clinicDbs = localStorage.getItem("clinic-database");

    axios
      .delete(`http://localhost:3002/patients/${UserIdDelete}`, {
        headers: {
          "access-token": tokens,
          "clinic-database": clinicDbs,
          role: roles,
        },
      })
      .then((response) => {
        handleCancel();

        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddPatient = async () => {
    const token = localStorage.getItem("access-token");
    const role = localStorage.getItem("role");
    const clinicDb = localStorage.getItem("clinic-database");
    axios
      .post(
        "http://localhost:3002/patients",
        {
          last_name: nom,
          first_name: prenom,
          cin: cin,
          phone: phone,
          gender: selectedGender,
          date_of_birth: date,
          height: height,
          weight: weight,
          insurance: selectedInsurance,
          email: email,
        },
        {
          headers: {
            "access-token": token,
            "clinic-database": clinicDb,
            role: role,
          },
        }
      )
      .then((response) => {
        handleCancel();
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancelRDV = () => {
    setIsAddDisplayed(0);
  };

  const handleAddRDV = async () => {
    const token = localStorage.getItem("access-token");
    const role = localStorage.getItem("role");
    const clinicDb = localStorage.getItem("clinic-database");
    if (token) {
      axios
        .post(
          "http://localhost:3002/appointments",
          {
            patient_id: selectedId,
            time: time,
            date: date,
            type: selectedType,
            doctor_id: docId,
          },
          {
            headers: {
              "access-token": token,
              "clinic-database": clinicDb,
              role: role,
            },
          }
        )
        .then((response) => {
          handleCancel();
          navigate("/rdv");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("Token d'authentification non disponible.");
    }
  };

  const handleBtnAddRdv = (selectedId, selectedNom, selectedPrenom) => {
    setSelectedId(selectedId);
    setSelectedNom(selectedNom);
    setSelectedPrenom(selectedPrenom);
    setIsAddDisplayed(1);
  };

  const [displayedEdit, setDisplayedEdit] = useState();
  const [editPatientId, setEditPatientId] = useState();
  const [patientToEdit, setPatientToEdit] = useState([]);
  const [nomEdit, setNomEdit] = useState();
  const [prenomEdit, setPrenomEdit] = useState();
  const [emailEdit, setEmailEdit] = useState();
  const [cinEdit, setCinEdit] = useState();
  const [phoneEdit, setPhoneEdit] = useState();
  const [heightEdit, setHeightEdit] = useState();
  const [weightEdit, setWeightEdit] = useState();
  const [insuranceEdit, setInsuranceEdit] = useState();
  const [dateEdit, setDateEdit] = useState();
  const [selectedDocEdit, setSelectedDocEdit] = useState();
  const [selectedGenderEdit, setSelectedGenderEdit] = useState();
  const handleDocSelectionEdit = (event) => {
    setSelectedDocEdit(event.target.value);
  };
  const handleGenderSelectionEdit = (event) => {
    setSelectedGenderEdit(event.target.value);
  };

  const editPatient = (id) => {
    setDisplayedEdit(1);
    setEditPatientId(id);
    const token = localStorage.getItem("access-token");
    const role = localStorage.getItem("role");
    const clinicDb = localStorage.getItem("clinic-database");
    axios
      .get(`http://localhost:3002/patients/${id}`, {
        headers: {
          "access-token": token,
          "clinic-database": clinicDb,
          role: role,
        },
      })
      .then((respone) => {
        if (respone.data.length > 0) {
          setPatientToEdit(respone.data[0]);
          setNomEdit(respone.data[0].last_name);
          setPrenomEdit(respone.data[0].first_name);
          setEmailEdit(respone.data[0].email);
          setCinEdit(respone.data[0].cin);
          setPhoneEdit(respone.data[0].phone);
          setHeightEdit(respone.data[0].height);
          setWeightEdit(respone.data[0].weight);
          setInsuranceEdit(respone.data[0].Insurance);
          setDateEdit(respone.data[0].date_of_birth);
          setSelectedGenderEdit(respone.data[0].gender);
        } else {
          setPatientToEdit([]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleEditPatient = async () => {
    const token = localStorage.getItem("access-token");
    const role = localStorage.getItem("role");
    const clinicDb = localStorage.getItem("clinic-database");
    axios
      .put(
        "http://localhost:3002/patients/" + editPatientId,
        {
          last_name: nomEdit,
          first_name: prenomEdit,
          email: emailEdit,
          cin: cinEdit,
          phone: phoneEdit,
          height: heightEdit,
          weight: weightEdit,
          insurance: insuranceEdit,
          date_of_birth: dateEdit,
          gender: selectedGenderEdit,
        },
        {
          headers: {
            "access-token": token,
            "clinic-database": clinicDb,
            role: role,
          },
        }
      )
      .then((response) => {
        handleCancel();
        window.location.reload();
        setDisplayedEdit([0, null]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const searchPatient = (value) => {
    if (value === "") {
      window.location.reload();
    }
    const token = localStorage.getItem("access-token");
    const role = localStorage.getItem("role");
    const clinicDb = localStorage.getItem("clinic-database");
    axios
      .get(`http://localhost:3002/patients/search/${value}`, {
        headers: {
          "access-token": token,
          "clinic-database": clinicDb,
          role: role,
          value: value,
        },
      })
      .then((respone) => {
        if (respone.data.length > 0) {
          setUsers(respone.data);
        } else {
          setUsers([]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 7; hour <= 21; hour++) {
      for (let minute = 0; minute < 60; minute += 5) {
        const time = new Date(0, 0, 0, hour, minute);
        const formattedTime = new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(time);
        times.push(formattedTime);
      }
    }
    return times;
  };
  const [time, setTime] = useState("12:00");

  const timeOptions = generateTimeOptions();

  const handleTimeChange = (e) => {
    setTime(e.target.value);
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
      <Card className="h-full w-full rounded-none">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h4" color="blue-gray">
                Liste des patients
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 2xl:flex-row mt-3 mr-6">
              <Button
                onClick={() => setDisplayed(1)}
                className="flex items-center gap-3"
                size="sm"
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Ajouter un
                patient
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="w-full md:w-72">
              <Input
                label="Rechercher"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                onChange={(e) => searchPatient(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-auto px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
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
              {getVisiblePatients().map(
                ({ id, first_name, last_name, cin, phone }, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={index}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {last_name}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {first_name}
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
                            {cin}
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
                        <Tooltip content="Prendre rendez-vous">
                          <IconButton
                            onClick={() =>
                              handleBtnAddRdv(id, last_name, first_name)
                            }
                            variant="text"
                            className="ml-[-1.5rem]"
                          >
                            <PlusCircle className="h-4 w-4 text-green-400" />
                          </IconButton>
                        </Tooltip>
                        {/* <Tooltip content="Informations">
                          <IconButton variant="text" className="ml-[-0.5rem]">
                            <BadgeInfo
                              className="h-4 w-4 text-gray-700"
                              onClick={() => handleGetInfoPatient(id)}
                            />
                          </IconButton>
                        </Tooltip> */}
                        <Tooltip content="Modifier patient">
                          <IconButton
                            variant="text"
                            className="ml-[-0.5rem]"
                            onClick={() => {
                              editPatient(id);
                            }}
                          >
                            <PencilIcon className="h-4 w-4 text-blue-700" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Supprimer patient">
                          <IconButton
                            variant="text"
                            className="ml-[-0.5rem]"
                            onClick={() => handleDeleteUser(id)}
                          >
                            <TrashIcon className="h-4 w-4" color="red" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4 absolute bottom-2 w-full ">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page {currentPage} sur {totalPages}
          </Typography>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              size="sm"
              disabled={currentPage === 1} // Disable previous button on first page
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Précédent
            </Button>
            <Button
              variant="outlined"
              size="sm"
              disabled={currentPage === totalPages} // Disable next button on last page
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Suivant
            </Button>
          </div>
        </CardFooter>
      </Card>
      {isAddDisplayed ? (
        <div
          className="relative z-20"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div className="fixed inset-0 z-10  overflow-y-auto w-full">
            <div className=" flex min-h-full items-center justify-center p-4 text-center lg:items-center lg:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all 2xl:my-8 2xl:w-full 2xl:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 lg:p-6 lg:pb-4">
                  <div className="2xl:flex justify-start 2xl:items-start">
                    <form class="w-full max-w-2xl">
                      <div class="flex  mx-3 mb-6">
                        <div class="w-4/6 px-3 mb-6 md:mb-0">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-state"
                          >
                            Patient
                          </label>
                          <div class="relative">
                            <label
                              name="roler"
                              className=" text-nowrap block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="grid-state"
                              value={patientId}
                              onChange={handlePatientSelection}
                            >
                              {selectedNom} {selectedPrenom}
                            </label>
                          </div>
                        </div>
                        <div class="w-4/6 px-3 mb-6 md:mb-0">
                          <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-state"
                          >
                            Docteur
                          </label>
                          <div class="relative">
                            <select
                              name="roler"
                              class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="grid-state"
                              value={docId}
                              onChange={handleDocSelection}
                            >
                              <option value="">Choisir</option>
                              {docs.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.first_name} {item.last_name}
                                </option>
                              ))}
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                              <svg
                                class="fill-current h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        {/* <div class="w-full md:w-1/2 px-3">
                          <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-last-name"
                          >
                            heure
                          </label>
                          <input
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            type="time"
                            placeholder="SIX"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                          />
                        </div> */}
                        <div className="w-1/2  md:w-1/2 px-3">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="time-select"
                          >
                            Heure
                          </label>
                          <select
                            id="time-select"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            value={time}
                            onChange={handleTimeChange}
                          >
                            {timeOptions.map((timeOption) => (
                              <option key={timeOption} value={timeOption}>
                                {timeOption}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div class="flex mx-3 mb-6">
                        <div class="w-full md:w-1/2 px-3">
                          <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-last-name"
                          >
                            date
                          </label>
                          <input
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            type="date"
                            placeholder="SIX"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                          />
                        </div>
                        <div class="w-4/6 px-3 mb-6 md:mb-0">
                          <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-state"
                          >
                            type de rdv
                          </label>
                          <div class="relative">
                            <select
                              name="roler"
                              class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="grid-state"
                              value={selectedType}
                              onChange={handleTypeSelection}
                            >
                              <option value="">Choisir</option>
                              <option value="Consultation">Consultation</option>
                              <option value="Test">Test</option>
                              <option value="Control">Contrôle</option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                              <svg
                                class="fill-current h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 2xl:flex 2xl:flex-row-reverse 2xl:px-6">
                  <button
                    onClick={() => {
                      handleAddRDV();
                    }}
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-super-admin-submit px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-900 2xl:ml-3 2xl:w-auto"
                  >
                    Enregistrer
                  </button>
                  <button
                    onClick={() => {
                      setIsAddDisplayed(0);
                    }}
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 2xl:mt-0 2xl:w-auto"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {displayed ? (
        <div
          className="relative z-20"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className=" flex min-h-full items-center justify-center p-4 text-center lg:items-center lg:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all 2xl:my-8 2xl:w-full 2xl:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 lg:p-6 lg:pb-4">
                  <div className="2xl:flex justify-start 2xl:items-start">
                    <form class="w-full max-w-2xl">
                      <div class="flex  mx-3 ">
                        <div class="w-full md:w-1/2 px-3 mb-8 ">
                          <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-first-name"
                          >
                            Prénom
                          </label>
                          <input
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="grid-first-name"
                            type="text"
                            placeholder="John"
                            value={prenom}
                            onChange={(e) => setPrenom(e.target.value)}
                          />
                        </div>
                        <div class="w-full md:w-1/2 px-3">
                          <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-last-name"
                          >
                            Nom
                          </label>
                          <input
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            type="text"
                            placeholder="Doe"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                          />
                        </div>
                        <div class="w-full md:w-1/2 px-3">
                          <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-last-name"
                          >
                            date de naissance
                          </label>
                          <input
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            type="date"
                            placeholder="SIX"
                            value={dateEdit}
                            onChange={(e) => setDate(e.target.value)}
                          />
                        </div>
                      </div>

                      <div class="flex mx-3 mb-8">
                        <div class="w-full px-3">
                          <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-password"
                          >
                            Cin
                          </label>
                          <input
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            type="text"
                            placeholder="AE123456"
                            value={cin}
                            onChange={(e) => setCin(e.target.value)}
                          />
                        </div>
                        <div class="w-full px-3">
                          <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-password"
                          >
                            Taille
                          </label>
                          <input
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            type="number"
                            placeholder="175"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                          />
                        </div>
                        <div class="w-full px-3">
                          <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-password"
                          >
                            Poids
                          </label>
                          <input
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            type="number"
                            placeholder="70"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                          />
                        </div>
                      </div>
                      <div class="flex mx-3 mb-8">
                        <div class="w-full px-3">
                          <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-password"
                          >
                            Email
                          </label>
                          <input
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            type="text"
                            placeholder="exemple@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div class="w-full px-3">
                          <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-password"
                          >
                            Assurance
                          </label>
                          <div class="relative">
                            <select
                              name="roler"
                              class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="grid-state"
                              value={selectedInsurance}
                              onChange={handleInsuranceSelection}
                            >
                              <option value="">Choisir</option>
                              <option value="Wafa Assurance">
                                Wafa Assurance
                              </option>
                              <option value="RMA Watanya">RMA Watanya</option>
                              <option value="AtlantaSanad">AtlantaSanad</option>
                              <option value="AXA Assurance Maroc">
                                AXA Assurance Maroc
                              </option>
                              <option value="Saham Assurance">
                                Saham Assurance
                              </option>
                              <option value="MAMDA">MAMDA</option>
                              <option value="MCMA">MCMA</option>
                              <option value="La Marocaine Vie">
                                La Marocaine Vie
                              </option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                              <svg
                                class="fill-current h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="flex mx-3 mb-2">
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                          <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-password"
                          >
                            Numéro de téléphone
                          </label>
                          <input
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            type="number"
                            placeholder="06 12 34 56 78"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                          {/* <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> */}
                        </div>
                        <div class="w-4/6 px-3 mb-6 md:mb-0">
                          <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-state"
                          >
                            Genre
                          </label>
                          <div class="relative">
                            <select
                              name="roler"
                              class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="grid-state"
                              value={selectedGender}
                              onChange={handleSelection}
                            >
                              <option value="">Choisir</option>
                              <option value="M">M</option>
                              <option value="F">F</option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                              <svg
                                class="fill-current h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 2xl:flex 2xl:flex-row-reverse 2xl:px-6">
                  <button
                    onClick={() => {
                      handleAddPatient();
                    }}
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-super-admin-submit px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-900 2xl:ml-3 2xl:w-auto"
                  >
                    Enregistrer
                  </button>
                  <button
                    onClick={() => {
                      setDisplayed(0);
                    }}
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 2xl:mt-0 2xl:w-auto"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      {displayedEdit && (
        <div
          className="relative z-20"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className=" flex min-h-full items-center justify-center p-4 text-center lg:items-center lg:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all 2xl:my-8 2xl:w-full 2xl:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 lg:p-6 lg:pb-4">
                  <div className="2xl:flex justify-start 2xl:items-start">
                    <form class="w-full max-w-2xl">
                      <div class="flex  mx-3 ">
                        <div class="w-full md:w-1/2 px-3 mb-8 ">
                          <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-first-name"
                          >
                            Prénom
                          </label>
                          <input
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="grid-first-name"
                            type="text"
                            placeholder="John"
                            value={prenomEdit}
                            onChange={(e) => setPrenomEdit(e.target.value)}
                          />
                        </div>
                        <div class="w-full md:w-1/2 px-3">
                          <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-last-name"
                          >
                            Nom
                          </label>
                          <input
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            type="text"
                            placeholder="Doe"
                            value={nomEdit}
                            onChange={(e) => setNomEdit(e.target.value)}
                          />
                        </div>
                        <div class="w-full md:w-1/2 px-3">
                          <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-last-name"
                          >
                            date de naissance
                          </label>
                          <input
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            type="date"
                            placeholder="SIX"
                            value={dateEdit}
                            onChange={(e) => setDateEdit(e.target.value)}
                          />
                        </div>
                      </div>

                      <div class="flex mx-3 mb-8">
                        <div class="w-full px-3">
                          <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-password"
                          >
                            Cin
                          </label>
                          <input
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            type="text"
                            placeholder="AE123456"
                            value={cinEdit}
                            onChange={(e) => setCinEdit(e.target.value)}
                          />
                        </div>
                        <div class="w-full px-3">
                          <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-password"
                          >
                            Taille
                          </label>
                          <input
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            type="number"
                            placeholder="175"
                            value={heightEdit}
                            onChange={(e) => setHeightEdit(e.target.value)}
                          />
                        </div>
                        <div class="w-full px-3">
                          <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-password"
                          >
                            Poids
                          </label>
                          <input
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            type="number"
                            placeholder="70"
                            value={weightEdit}
                            onChange={(e) => setWeightEdit(e.target.value)}
                          />
                        </div>
                      </div>
                      <div class="flex mx-3 mb-8">
                        <div class="w-full px-3">
                          <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-password"
                          >
                            Email
                          </label>
                          <input
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            type="text"
                            placeholder="exemple@gmail.com"
                            value={emailEdit}
                            onChange={(e) => setEmailEdit(e.target.value)}
                          />
                        </div>
                        <div class="w-full px-3">
                          <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-password"
                          >
                            Assurance
                          </label>
                          <input
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            type="text"
                            placeholder="CNSS"
                            value={insuranceEdit}
                            onChange={(e) => setInsuranceEdit(e.target.value)}
                          />
                        </div>
                      </div>
                      <div class="flex mx-3 mb-2">
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                          <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-password"
                          >
                            Numéro de téléphone
                          </label>
                          <input
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            type="number"
                            placeholder="06 12 34 56 78"
                            value={phoneEdit}
                            onChange={(e) => setPhoneEdit(e.target.value)}
                          />
                          {/* <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> */}
                        </div>
                        <div class="w-4/6 px-3 mb-6 md:mb-0">
                          <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-state"
                          >
                            Genre
                          </label>
                          <div class="relative">
                            <select
                              name="roler"
                              class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="grid-state"
                              value={selectedGenderEdit}
                              onChange={handleGenderSelectionEdit}
                            >
                              <option value="">Choisir</option>
                              <option value="M">M</option>
                              <option value="F">F</option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                              <svg
                                class="fill-current h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 2xl:flex 2xl:flex-row-reverse 2xl:px-6">
                  <button
                    onClick={() => {
                      handleEditPatient();
                    }}
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-super-admin-submit px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-900 2xl:ml-3 2xl:w-auto"
                  >
                    Enregistrer
                  </button>
                  <button
                    onClick={() => {
                      setDisplayedEdit(null);
                      setEditPatientId(null);
                    }}
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 2xl:mt-0 2xl:w-auto"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SecretaryPatients;
