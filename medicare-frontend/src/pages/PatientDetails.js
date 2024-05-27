import SidebarItem from "../components/Sidebar/Sidebar";
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { useParams } from "react-router-dom";
import {
  Home,
  Users,
  Hospital,
  Calendar,
  WalletMinimal,
  Eye,
  Trash2,
  Download,
} from "lucide-react";
import {
  Card,
  CardBody,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import axios from "axios";
import dayjs from "dayjs";

function PatientDetails() {
  const { patientId } = useParams();
  const [patient, setPatient] = useState({});
  const [dateNaissance, setDateNaissance] = useState(new Date());
  const [telephone, setTelephone] = useState("");
  const [taille, setTaille] = useState("");
  const [poids, setPoids] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [insurance, setInsurance] = useState("");
  const [cin, setCin] = useState("");
  const [documents, setDocuments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const documentsPerPage = 4;

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const token = localStorage.getItem("access-token");
        const clinicDb = localStorage.getItem("clinic-database");

        const response = await axios.get(
          `http://localhost:3002/patients/${patientId}`,
          {
            headers: {
              "access-token": token,
              "clinic-database": clinicDb,
              role: "doctor",
            },
          }
        );
        setDateNaissance(response.data[0].date_of_birth);
        setTelephone(response.data[0].phone);
        setTaille(response.data[0].height);
        setPoids(response.data[0].weight);
        setFirstName(response.data[0].first_name);
        setLastName(response.data[0].last_name);
        setInsurance(response.data[0].insurance);
        setCin(response.data[0].cin);
        setAge(
          new Date().getFullYear() -
            new Date(response.data[0].date_of_birth).getFullYear()
        );
      } catch (error) {
        console.error(error);
      }
    };

    const fetchDocuments = async () => {
      try {
        const token = localStorage.getItem("access-token");
        const clinicDb = localStorage.getItem("clinic-database");

        const response = await axios.get(
          `http://localhost:3002/documents/${patientId}`,
          {
            headers: {
              "access-token": token,
              "clinic-database": clinicDb,
            },
          }
        );
        setDocuments(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPatient();
    fetchDocuments();
  }, [patientId]);

  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = documents.slice(
    indexOfFirstDocument,
    indexOfLastDocument
  );

  const totalPages = Math.ceil(documents.length / documentsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleDeleteDocument = async (documentId) => {
    try {
      const token = localStorage.getItem("access-token");
      const clinicDb = localStorage.getItem("clinic-database");

      await axios.delete(`http://localhost:3002/documents/${documentId}`, {
        headers: {
          "access-token": token,
          "clinic-database": clinicDb,
        },
      });
      setDocuments(documents.filter((doc) => doc.id !== documentId));
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const getDocumentColor = (type) => {
    switch (type) {
      case "consultation":
        return "text-blue-500";
      case "prescription":
        return "text-green-500";
      case "medical_certificate":
        return "text-yellow-500";
      default:
        return "text-gray-500";
    }
  };
  const getDocType = (type) => {
    switch (type) {
      case "consultation":
        return "Consultation";
      case "prescription":
        return "Ordonance";
      case "medical_certificate":
        return "Certificat Médical";
    }
  };

  return (
    <div className="flex w-screen h-screen">
      <Sidebar>
        <SidebarItem icon={<Home size={20} />} text="Accueil" alert />
        <SidebarItem icon={<Users size={20} />} text="Utilisateurs" active />
        <SidebarItem icon={<Hospital size={20} />} text="Patients" alert />
        <SidebarItem icon={<Calendar size={20} />} text="Rendez-vous" />
        <SidebarItem icon={<WalletMinimal size={20} />} text="Paiements" />
      </Sidebar>

      <Card className="h-full w-full overflow-auto bg-gray-50">
        <Typography
          color="blue-gray"
          variant="h4"
          className="my-6 mb-12 uppercase"
        >
          Détails du patient
        </Typography>
        <CardBody className="px-8">
          <div className="mb-10 pt-2 border border-white rounded-xl bg-white w-6/12 mx-auto">
            <Typography color="blue" variant="h5">
              Informations Patient
            </Typography>
            <div className="border-t border-blue-100 mt-4"></div>
            <div className="text-lg">
              <table className="min-w-full bg-white">
                <tbody>
                  <tr className="w-full">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <Typography className="font-bold">Nom</Typography>
                      {firstName} {lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <Typography className="font-bold">Téléphone</Typography>
                      {telephone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <Typography className="font-bold">Taille</Typography>
                      {taille} cm
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <Typography className="font-bold">Poids</Typography>
                      {poids} kg
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <Typography className="font-bold">Age</Typography>
                      {age} ans
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {documents[0] != null ? (
            <div className="mb-10 pt-2 border border-white rounded-xl bg-white w-9/12 mx-auto">
              <Typography color="blue" variant="h5">
                Documents
              </Typography>
              <div className="border-t border-blue-100 mt-4 mb-8"></div>
              <div className="text-lg grid grid-cols-4 gap-4 mx-10">
                {currentDocuments.map((doc) => (
                  <Card key={doc.id} className={`mb-2 border-gray-200`}>
                    <CardBody>
                      <Typography
                        variant="h6"
                        className={`mb-2  ${getDocumentColor(doc.type)}`}
                      >
                        {getDocType(doc.type)}
                      </Typography>
                      <Typography className="font-bold">
                        Date: {dayjs(doc.date).format("DD/MM/YYYY")}
                      </Typography>
                      {/* 
                      <div className="flex justify-center mt-4 space-x-2">
                        <Button
                          color="blue"
                          variant="outlined"
                          size="sm"
                          onClick={() => {
                            const blob = new Blob(
                              [
                                Uint8Array.from(atob(doc.content), (c) =>
                                  c.charCodeAt(0)
                                ),
                              ],
                              { type: "application/pdf" }
                            );
                            const url = URL.createObjectURL(blob);
                            window.open(url, "_blank");
                          }}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                        </Button>
                        <Button
                          color="green"
                          variant="outlined"
                          size="sm"
                          onClick={() => {
                            const blob = new Blob(
                              [
                                Uint8Array.from(atob(doc.content), (c) =>
                                  c.charCodeAt(0)
                                ),
                              ],
                              { type: "application/pdf" }
                            );
                            const url = URL.createObjectURL(blob);
                            const link = document.createElement("a");
                            link.href = url;
                            link.download = `${doc.filename}`;
                            link.click();
                          }}
                        >
                          <Download className="w-4 h-4 mr-1" />
                        </Button>
                        <Button
                          color="red"
                          variant="outlined"
                          size="sm"
                          onClick={() => handleDeleteDocument(doc.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                        </Button>
                      </div> */}

                      <div className="flex justify-center mt-4 space-x-2">
                        <IconButton
                          color="blue"
                          onClick={() => {
                            const blob = new Blob(
                              [
                                Uint8Array.from(atob(doc.content), (c) =>
                                  c.charCodeAt(0)
                                ),
                              ],
                              { type: "application/pdf" }
                            );
                            const url = URL.createObjectURL(blob);
                            window.open(url, "_blank");
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </IconButton>
                        <IconButton
                          color="green"
                          onClick={() => {
                            const blob = new Blob(
                              [
                                Uint8Array.from(atob(doc.content), (c) =>
                                  c.charCodeAt(0)
                                ),
                              ],
                              { type: "application/pdf" }
                            );
                            const url = URL.createObjectURL(blob);
                            const link = document.createElement("a");
                            link.href = url;
                            link.download = `${doc.filename}`;
                            link.click();
                          }}
                        >
                          <Download className="w-4 h-4" />
                        </IconButton>
                        <IconButton
                          color="red"
                          onClick={() => handleDeleteDocument(doc.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </IconButton>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
              <div className="flex  justify-between border-blue-gray-50 border-t p-2 my-2  bottom-2 w-full ">
                {/* <div className="flex justify-center mt-4"> */}
                <Typography
                  color="gray"
                  variant="h6"
                  className="my-auto font-thin"
                >
                  Page {currentPage} sur {totalPages}
                </Typography>
                <div className="my-auto">
                  {" "}
                  <Button
                    className="mr-2"
                    color="blue"
                    variant="outlined"
                    disabled={currentPage === 1}
                    onClick={handlePreviousPage}
                  >
                    Précédent
                  </Button>
                  <Button
                    color="blue"
                    variant="outlined"
                    disabled={currentPage === totalPages}
                    onClick={handleNextPage}
                  >
                    Suivant
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <Typography color="blue-gray" variant="h5">
                Aucun document trouvé
              </Typography>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

export default PatientDetails;
