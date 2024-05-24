import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { SidebarItem } from "../../components/Sidebar/Sidebar";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import docsImage from "./admin.png";
import logoImage from "./medicare_logo.png";
import { WalletMinimal, Users, Hospital, TrashIcon } from "lucide-react";
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
import { setId } from "@material-tailwind/react/components/Tabs/TabsContext";

function AdminDashboard() {
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

  const TABLE_HEAD = ["Nom", "Prénom", "email", "Fonction", "Actions"];

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
    setIdToDelete(null);
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
            .get("http://localhost:3002/users", {
              headers: {
                // 'Authorization': Bearer ${token} ,
                "access-token": token,
                "clinic-database": cdb,
                role: role,
              },
            })
            .then((response) => {
              setUsers(response.data);
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

  const TABLE_ROWS = users;

  const [nom, setNom] = useState();
  const [prenom, setPrenom] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [selectedRole, setSelectedRole] = useState();
  const [displayed, setDisplayed] = useState();
  const [displayedEdit, setDisplayedEdit] = useState();
  const [editUserId, setEditUserId] = useState();
  const [userToEdit, setUserToEdit] = useState([]);
  const [nomEdit, setNomEdit] = useState();
  const [prenomEdit, setPrenomEdit] = useState();
  const [emailEdit, setEmailEdit] = useState();
  const [passwordEdit, setPasswordEdit] = useState();
  const [selectedRoleEdit, setSelectedRoleEdit] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(users?.length / itemsPerPage) || 1;
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleSelectionEdit = (event) => {
    setSelectedRoleEdit(event.target.value);
  };
  const handleSelection = (event) => {
    setSelectedRole(event.target.value);
  };

  const getVisibleUsers = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return users?.slice(startIndex, endIndex);
  };

  const handleAddUser = async () => {
    const token = localStorage.getItem("access-token");
    const role = localStorage.getItem("role");
    const clinicDb = localStorage.getItem("clinic-database");
    if (token) {
      axios
        .post(
          "http://localhost:3002/users",
          {
            last_name: nom,
            first_name: prenom,
            email: email,
            password: password,
            role: selectedRole,
            clinic_id: cdb,
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
          setDisplayed(null);
          navigate("/admin/dashboard");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("Token d'authentification non disponible.");
    }
  };

  const handleEditUser = async () => {
    const token = localStorage.getItem("access-token");
    const role = localStorage.getItem("role");
    const clinicDb = localStorage.getItem("clinic-database");
    axios
      .put(
        "http://localhost:3002/users/" + editUserId,
        {
          last_name: nomEdit,
          first_name: prenomEdit,
          email: emailEdit,
          role: selectedRoleEdit,
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
        navigate("/admin/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteUser = (UserIdDelete) => {
    const tokens = localStorage.getItem("access-token");
    const roles = localStorage.getItem("role");
    const clinicDbs = localStorage.getItem("clinic-database");
    axios
      .delete(`http://localhost:3002/users/${UserIdDelete}`, {
        headers: {
          "access-token": tokens,
          "clinic-database": clinicDbs,
          role: roles,
        },
      })
      .then((response) => {
        handleCancel();
        window.location.reload();
        navigate("/admin/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const searchUser = (value) => {
    if (value === "") {
      window.location.reload();
    }
    const token = localStorage.getItem("access-token");
    const role = localStorage.getItem("role");
    const clinicDb = localStorage.getItem("clinic-database");
    axios
      .get(`http://localhost:3002/users/search/${value}`, {
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
  const editUser = (id) => {
    setDisplayedEdit(1);
    setEditUserId(id);
    const token = localStorage.getItem("access-token");
    const role = localStorage.getItem("role");
    const clinicDb = localStorage.getItem("clinic-database");
    axios
      .get(`http://localhost:3002/users/${id}`, {
        headers: {
          "access-token": token,
          "clinic-database": clinicDb,
          role: role,
        },
      })
      .then((respone) => {
        if (respone.data.length > 0) {
          setUserToEdit(respone.data[0]);
          setNomEdit(respone.data[0].last_name);
          setPrenomEdit(respone.data[0].first_name);
          setEmailEdit(respone.data[0].email);
          setSelectedRoleEdit(respone.data[0].role);
        } else {
          setUserToEdit([]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
              <Typography variant="h5" color="blue-gray">
                Liste des membres du cabinet
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 2xl:flex-row">
              <Button
                onClick={() => setDisplayed(1)}
                className="flex items-center gap-3"
                size="sm"
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Ajouter un
                membre
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row border-2 border-transparent lg:w-72 w-96 ">
            <div className="w-full md:w-72">
              <Input
                label="Rechercher"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                onChange={(e) => searchUser(e.target.value)}
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
              {getVisibleUsers().map(
                (
                  { id, first_name, last_name, email, role, clinicDbName },
                  index
                ) => {
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
                            {email}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-24 text-center">
                          {role == "doctor" && (
                            <Chip
                              variant="ghost"
                              size="sm"
                              strokeWidth={2}
                              value="Médecin"
                              color={"green"}
                            />
                          )}
                          {role == "secretary" && (
                            <Chip
                              variant="ghost"
                              size="sm"
                              value="Secrétaire"
                              color={"orange"}
                            />
                          )}
                        </div>
                      </td>

                      <td className={classes}>
                        <Tooltip content="Modifier utilisateur">
                          <IconButton
                            onClick={() => {
                              editUser(id);
                            }}
                            variant="text"
                            className="ml-[-1rem]"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Supprimer utilisateur">
                          <IconButton
                            onClick={() => handleDeleteUser(id)}
                            variant="text"
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
      {displayed && (
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
                      <div class="flex  mx-3 mb-2">
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
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
                            placeholder="Jon"
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
                      </div>
                      <div class="flex mx-3 mb-6">
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
                          {/* <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> */}
                        </div>
                      </div>
                      <div class="flex mx-3 mb-2">
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                          <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-password"
                          >
                            Mot de passe
                          </label>
                          <input
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            type="password"
                            placeholder="******************"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          {/* <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> */}
                        </div>
                        <div class="w-4/6 px-3 mb-6 md:mb-0">
                          <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-state"
                          >
                            Rôle
                          </label>
                          <div class="relative">
                            <select
                              name="roler"
                              class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="grid-state"
                              value={selectedRole}
                              onChange={handleSelection}
                            >
                              <option value="">Choisir</option>
                              <option value="doctor">Docteur</option>
                              <option value="secretary">Secrétaire</option>
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
                    onClick={handleAddUser}
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-light-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-900 2xl:ml-3 2xl:w-auto"
                  >
                    Enregistrer
                  </button>
                  <button
                    onClick={() => {
                      setDisplayed(null);
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
                      <div class="flex  mx-3 mb-2">
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
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
                            placeholder="Jon"
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
                      </div>
                      <div class="flex mx-3 mb-6">
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
                            type="email"
                            placeholder="exemple@gmail.com"
                            value={emailEdit}
                            onChange={(e) => setEmailEdit(e.target.value)}
                          />
                          {/* <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> */}
                        </div>
                      </div>
                      <div class="flex mx-3 mb-2">
                        {/* <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                          <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-password"
                          >
                            Mot de passe
                          </label>
                          <input
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            type="password"
                            placeholder="******************"
                            value={passwordEdit}
                            onChange={(e) => setPasswordEdit(e.target.value)}
                          />
                        </div> */}
                        <div class="w-full px-3 mb-6 md:mb-0">
                          <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-state"
                          >
                            Rôle
                          </label>
                          <div class="relative">
                            <select
                              name="roler"
                              class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="grid-state"
                              value={selectedRoleEdit}
                              onChange={handleSelectionEdit}
                            >
                              <option value="">Choisir</option>
                              <option value="doctor">Docteur</option>
                              <option value="secretary">Secrétaire</option>
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
                    onClick={handleEditUser}
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-light-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-900 2xl:ml-3 2xl:w-auto"
                  >
                    Enregistrer
                  </button>
                  <button
                    onClick={() => {
                      setDisplayedEdit(null);
                      setEditUserId(null);
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

export default AdminDashboard;
