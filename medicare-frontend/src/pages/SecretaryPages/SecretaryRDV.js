import React, { useState, useEffect } from "react";
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineIcon,
  TimelineHeader,
} from "@material-tailwind/react";
import {
  BellIcon,
  ArchiveBoxIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import Sidebar from "../../components/Sidebar/Sidebar";
import { SidebarItem } from "../../components/Sidebar/Sidebar";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CalendarComponent from "../../components/CalendarComponent";

import {
  WalletMinimal,
  Users,
  Hospital,
  TrashIcon,
  ScanEye,
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

function SecretaryRDV() {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [idToDelete, setIdToDelete] = useState();

  const TABLE_HEAD = [
    "Patient",
    "Docteur",
    "Type de rdv",
    "Date",
    "Heure",
    "Status",
    "Actions",
  ];

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const [users, setUsers] = useState([]);
  const [rdvs, setRdvs] = useState([]);
  const [clinicDb, setClinicDb] = useState([]);

  const handleDeleteAppointment = (id) => {
    const tokens = localStorage.getItem("access-token");
    const roles = localStorage.getItem("role");
    const clinicDbs = localStorage.getItem("clinic-database");
    axios.delete(`http://localhost:3002/appointments/${id}`, {
      headers: {
        "access-token": tokens,
        "clinic-database": clinicDbs,
        role: roles,
      },
    });
    window.location.reload();
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
              "access-token": token,
              "clinic-database": cdb,
              role: role,
            },
          })
          .then((response) => {
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

  const TABLE_ROWS = rdvs;

  useEffect(() => {
    const token = localStorage.getItem("access-token");
    const role = localStorage.getItem("role");
    const clinicDb = localStorage.getItem("clinic-database");

    const fetchRDVs = async () => {
      const token = localStorage.getItem("access-token");
      const role = localStorage.getItem("role");
      setClinicDb(cdb);
      if (cdb) {
        try {
          axios
            .get("http://localhost:3002/appointments", {
              headers: {
                "access-token": token,
                "clinic-database": cdb,
                role: role,
              },
            })
            .then((response) => {
              if (response.data) {
                setRdvs(response.data);
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

    fetchRDVs();
  }, []);
  const searchRDV = (value) => {
    if (value === "") {
      window.location.reload();
    }
    const token = localStorage.getItem("access-token");
    const role = localStorage.getItem("role");
    const clinicDb = localStorage.getItem("clinic-database");
    axios
      .get(`http://localhost:3002/appointments/search/${value}`, {
        headers: {
          "access-token": token,
          "clinic-database": clinicDb,
          role: role,
          value: value,
        },
      })
      .then((respone) => {
        if (respone.data.length > 0) {
          setRdvs(respone.data);
        } else {
          setRdvs([]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [docs, setDocs] = useState([]);

  const [status, setStatus] = useState([
    { name: "pending", value: "En attente" },
    { name: "completed", value: "Passé" },
    { name: "cancelled", value: "Annulé" },
  ]);
  const [types, setTypes] = useState([
    { name: "consultation", value: "Consultation" },
    { name: "test", value: "Test" },
    { name: "control", value: "Contrôle" },
  ]);
  const handleDocSelection = (event) => {
    setDoctorEdit(event.target.value);
  };
  const handleStatusSelection = (event) => {
    setStatusEdit(event.target.value);
  };

  const handleTypeSelection = (event) => {
    setTypeEdit(event.target.value);
  };
  const [displayedEdit, setDisplayedEdit] = useState(null);
  const [editRdvId, setEditRdvId] = useState();
  const [rdvToEdit, setRdvToEdit] = useState([]);
  const [statusEdit, setStatusEdit] = useState();
  const [dateEdit, setDateEdit] = useState();
  const [timeEdit, setTimeEdit] = useState();
  const [typeEdit, setTypeEdit] = useState();
  const [patientEdit, setPatientEdit] = useState();
  const [doctorEdit, setDoctorEdit] = useState();
  const [patientName, setPatientName] = useState();
  const [view, setView] = useState("table");

  const editRdv = (id, patient_name) => {
    setDisplayedEdit(1);
    setEditRdvId(id);
    const token = localStorage.getItem("access-token");
    const role = localStorage.getItem("role");
    const clinicDb = localStorage.getItem("clinic-database");
    axios
      .get(`http://localhost:3002/appointments/${id}`, {
        headers: {
          "access-token": token,
          "clinic-database": clinicDb,
          role: role,
        },
      })
      .then((respone) => {
        if (respone.data.length > 0) {
          setRdvToEdit(respone.data[0]);
          setStatusEdit(respone.data[0].status);

          const currentDate = new Date(respone.data[0].date.split("T")[0]);
          currentDate.setDate(currentDate.getDate() + 1);
          const updatedDate = currentDate.toISOString().split("T")[0];

          setDateEdit(updatedDate);
          setTimeEdit(respone.data[0].time);
          setTypeEdit(respone.data[0].type);
          setDoctorEdit(respone.data[0].doctor_id);
          setPatientEdit(respone.data[0].patient_id);
          setPatientName(patient_name);
        } else {
          setRdvToEdit([]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleEditRdv = async () => {
    const token = localStorage.getItem("access-token");
    const role = localStorage.getItem("role");
    const clinicDb = localStorage.getItem("clinic-database");
    const id = localStorage.getItem("id");
    axios
      .put(
        "http://localhost:3002/appointments/" + editRdvId,
        {
          status: statusEdit,
          date: dateEdit,
          time: timeEdit,
          type: typeEdit,
          patient_id: patientEdit,
          doctor_id: doctorEdit,
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
        window.location.reload();
        setDisplayedEdit([0, null]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(rdvs?.length / itemsPerPage) || 1;
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getVisibleAppointments = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return rdvs?.slice(startIndex, endIndex);
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
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none pb-10"
        >
          <Typography variant="h4" color="blue-gray" className="mb-4">
            Liste des rendez-vous
          </Typography>
          <div className="flex flex-row items-center justify-between gap-4">
            <div className=" w-72">
              <Input
                label="Rechercher"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                onChange={(e) => searchRDV(e.target.value)}
              />
            </div>
            <div>
              <Button
                onClick={() => setView(view === "table" ? "calendar" : "table")}
              >
                {view === "table"
                  ? "Afficher le Calendrier"
                  : "Afficher la Table"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-auto px-0">
          {view === "table" ? (
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
                {getVisibleAppointments().map(
                  (
                    {
                      id,
                      patient_id,
                      patient_name,
                      doctor_name,
                      doctor_id,
                      type,
                      date,
                      time,
                      status,
                    },
                    index
                  ) => {
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
                                {patient_name}
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
                              {doctor_name}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {types.find((item) => item.name === type).value}
                            </Typography>
                          </div>
                        </td>

                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {new Intl.DateTimeFormat("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }).format(new Date(date))}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {new Intl.DateTimeFormat("en-GB", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            }).format(new Date(`1970-01-01T${time}Z`))}{" "}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            <div
                              className={`rounded-full h-5 w-5 ${
                                status === "pending"
                                  ? "bg-yellow-300"
                                  : status === "completed"
                                  ? "bg-green-300"
                                  : status === "cancelled"
                                  ? "bg-red-300"
                                  : "bg-gray-300"
                              }`}
                            ></div>
                          </Typography>
                        </td>

                        <td className={classes}>
                          <Tooltip content="Modifier RDV">
                            <IconButton
                              variant="text"
                              onClick={() => {
                                editRdv(id, patient_name);
                              }}
                              className="ml-[-0.5rem]"
                            >
                              <PencilIcon className="h-4 w-4 text-blue-700" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip content="Supprimer RDV">
                            <IconButton
                              variant="text"
                              className="ml-[-0.5rem]"
                              onClick={() => handleDeleteAppointment(id)}
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
          ) : (
            // <div style={{ height: "80vh" }}>
            <div className="m-10">
              <CalendarComponent appointments={rdvs} />
            </div>
          )}
        </CardBody>
        {view === "table" ? (
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4 absolute bottom-2 w-full ">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
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
        ) : (
          <></>
        )}
      </Card>

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
                        <div class="w-1/2 px-3 mb-8 ">
                          <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-first-name"
                          >
                            Patient
                          </label>
                          <input
                            class="appearance-none block w-full bg-gray-200 text-gray-500 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="grid-first-name"
                            type="text"
                            disabled
                            value={patientName}
                          />
                        </div>
                        <div class="w-1/2 px-3 mb-8 ">
                          <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-first-name"
                          >
                            Médecin
                          </label>
                          <select
                            name="roler"
                            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-state"
                            value={doctorEdit}
                            onChange={handleDocSelection}
                          >
                            <option value="">Docteur</option>
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
                      <div class="flex mx-3 mb-8">
                        <div class="w-full md:w-1/2 px-3">
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
                            value={timeEdit}
                            onChange={(e) => setTimeEdit(e.target.value)}
                          />
                        </div>
                        <div class="w-full md:w-1/2 px-3">
                          <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-last-name"
                          >
                            Date
                          </label>

                          <input
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            type="date"
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
                            Status
                          </label>
                          <div class="relative">
                            <select
                              name="roler"
                              class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="grid-state"
                              value={statusEdit}
                              onChange={handleStatusSelection}
                            >
                              {status.map((item) => (
                                <option key={item.value} value={item.name}>
                                  {item.value}
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
                        <div class="w-full px-3">
                          <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-password"
                          >
                            Type de rdv
                          </label>
                          <div class="relative">
                            <select
                              name="roler"
                              class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="grid-state"
                              value={typeEdit}
                              onChange={handleTypeSelection}
                            >
                              {types.map((item) => (
                                <option key={item.value} value={item.name}>
                                  {item.value}
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
                      </div>
                    </form>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 2xl:flex 2xl:flex-row-reverse 2xl:px-6">
                  <button
                    onClick={() => {
                      handleEditRdv();
                    }}
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-super-admin-submit px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-900 2xl:ml-3 2xl:w-auto"
                  >
                    Enregistrer
                  </button>
                  <button
                    onClick={() => {
                      setDisplayedEdit(null);
                      setEditRdvId(null);
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

export default SecretaryRDV;
