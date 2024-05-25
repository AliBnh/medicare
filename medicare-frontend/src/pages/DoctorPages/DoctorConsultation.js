import SidebarItem from "../../components/Sidebar/Sidebar";
import React, { useState, useRef } from "react";
import html2pdf from "html2pdf.js";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { Home, Users, Hospital, Calendar, WalletMinimal } from "lucide-react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Select,
  Option,
  Button,
  Textarea,
  IconButton,
} from "@material-tailwind/react";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect } from "react";
function DoctorConsultation() {
  const { rdvId } = useParams();
  const { patientId } = useParams();
  const navigate = useNavigate();
  const contentRef = useRef(null);

  const handleDownloadPDF = () => {
    const opt = {
      margin: 0,
      filename: "consultation.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().from(contentRef.current).set(opt).save();
  };

  const [id, setId] = useState("");
  const [dateNaissance, setDateNaissance] = useState(new Date());
  const [telephone, setTelephone] = useState("");
  const [taille, setTaille] = useState("");
  const [poids, setPoids] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");

  const [motifConsultation, setMotifConsultation] = useState("");
  const [symptomes, setSymptomes] = useState("");
  const [diagnostic, setDiagnostic] = useState("");
  const [antecedentsMedicaux, setAntecedentsMedicaux] = useState("");
  const [antecedentsChirurgicaux, setAntecedentsChirurgicaux] = useState("");
  const [antecedentsFamiliaux, setAntecedentsFamiliaux] = useState("");
  const [antecedentsAllergiques, setAntecedentsAllergiques] = useState("");
  const [diabete, setDiabete] = useState("");
  const [hta, setHta] = useState("");
  const [obesite, setObesite] = useState("");
  const [acideUrique, setAcideUrique] = useState("");
  const [tabac, setTabac] = useState("");
  const [alcool, setAlcool] = useState("");
  const [traitementsLongueDuree, setTraitementsLongueDuree] = useState("");
  const [notes, setNotes] = useState("");
  const [prixConsultation, setPrixConsultation] = useState("");
  const [remarqueOrdonnance, setRemarqueOrdonnance] = useState("");
  const [traitements, setTraitements] = useState([
    {
      medicament: "",
      formeGalenique: "",
      dosage: "",
      momentPrise: "",
      avantApresRepas: "",
      duree: "",
      jsm: "",
      remarque: "",
    },
  ]);

  const handleAddTraitement = () => {
    setTraitements([
      ...traitements,
      {
        medicament: "",
        formeGalenique: "",
        dosage: "",
        momentPrise: "",
        avantApresRepas: "",
        duree: "",
        jsm: "",
        remarque: "",
      },
    ]);
  };

  const handleRemoveTraitement = (index) => {
    const newTraitements = traitements.filter((_, i) => i !== index);
    setTraitements(newTraitements);
  };

  const handleTraitementChange = (index, field, value) => {
    const newTraitements = traitements.map((traitement, i) =>
      i === index ? { ...traitement, [field]: value } : traitement
    );
    setTraitements(newTraitements);
  };
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
        setId(response.data[0].id);
        setDateNaissance(response.data[0].date_of_birth);
        setTelephone(response.data[0].phone);
        setTaille(response.data[0].height);
        setPoids(response.data[0].weight);
        setFirstName(response.data[0].first_name);
        setLastName(response.data[0].last_name);
        setAge(
          new Date().getFullYear() -
            new Date(response.data[0].date_of_birth).getFullYear()
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchPatient();
  }, []);

  return (
    <div className="flex w-screen h-screen ">
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
          className="my-6 mb-12 uppercase "
        >
          Consultation
        </Typography>
        <CardBody className="px-8">
          <div className="mb-10 pt-2  border border-white rounded-xl bg-white w-9/12 mx-auto">
            <Typography color="blue" variant="h5">
              Informations Patient
            </Typography>
            {/* <hr className="my-2" /> */}
            <div className="border-t border-blue-100 mt-4"></div>
            <div className="text-lg">
              <table className="min-w-full bg-white">
                <tbody>
                  <tr className="w-full ">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <Typography className="font-bold">Nom </Typography>
                      {firstName} {lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <Typography className="font-bold">Téléphone </Typography>
                      {telephone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <Typography className="font-bold">Taille </Typography>
                      {taille} cm
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <Typography className="font-bold">Poids </Typography>
                      {poids} kg
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <Typography className="font-bold">Age </Typography>
                      {age} ans
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <Button className="mt-2" color="blue" variant="outlined">
                        <span className="font-bold">Historique</span>
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-10 pt-2 border border-white rounded-xl bg-white w-9/12 mx-auto">
            <Typography color="blue" variant="h5">
              Détails Consultation
            </Typography>
            <div className="border-t border-blue-100 mt-4"></div>
            <div className="grid grid-cols-1 gap-4 mt-4 mx-8 pb-6">
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Textarea
                  label="Motif de consultation"
                  value={motifConsultation}
                  onChange={(e) => setMotifConsultation(e.target.value)}
                />
                <Textarea
                  label="Symptômes"
                  value={symptomes}
                  onChange={(e) => setSymptomes(e.target.value)}
                />
                <Textarea
                  label="Diagnostic"
                  value={diagnostic}
                  onChange={(e) => setDiagnostic(e.target.value)}
                />
                <Textarea
                  label="Antécédents médicaux"
                  value={antecedentsMedicaux}
                  onChange={(e) => setAntecedentsMedicaux(e.target.value)}
                />
                <Textarea
                  label="Antécédents chirurgicaux"
                  value={antecedentsChirurgicaux}
                  onChange={(e) => setAntecedentsChirurgicaux(e.target.value)}
                />
                <Textarea
                  label="Antécédents familiaux"
                  value={antecedentsFamiliaux}
                  onChange={(e) => setAntecedentsFamiliaux(e.target.value)}
                />
                <Textarea
                  label="Antécédents allergiques"
                  value={antecedentsAllergiques}
                  onChange={(e) => setAntecedentsAllergiques(e.target.value)}
                />
                <Textarea
                  label="Traitements de longue durée en cours"
                  value={traitementsLongueDuree}
                  onChange={(e) => setTraitementsLongueDuree(e.target.value)}
                />
              </div>
              <Textarea
                label="Notes supplémentaires"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <div className="grid grid-cols-3 gap-4 mt-4">
                <Select
                  label="Diabète"
                  value={diabete}
                  onChange={(e) => setDiabete(e.target.value)}
                >
                  <Option>Oui</Option>
                  <Option>Non</Option>
                </Select>
                <Select
                  label="HTA"
                  value={hta}
                  onChange={(e) => setHta(e.target.value)}
                >
                  <Option>Oui</Option>
                  <Option>Non</Option>
                </Select>
                <Select
                  label="Tabac"
                  value={tabac}
                  onChange={(e) => setTabac(e.target.value)}
                >
                  <Option>Oui</Option>
                  <Option>Non</Option>
                </Select>
                <Select
                  label="Alcool"
                  value={alcool}
                  onChange={(e) => setAlcool(e.target.value)}
                >
                  <Option>Oui</Option>
                  <Option>Non</Option>
                </Select>
                <Select
                  label="Obésité"
                  value={obesite}
                  onChange={(e) => setObesite(e.target.value)}
                >
                  <Option>Oui</Option>
                  <Option>Non</Option>
                </Select>
                <Select
                  label="Acide urique"
                  value={acideUrique}
                  onChange={(e) => setAcideUrique(e.target.value)}
                >
                  <Option>Oui</Option>
                  <Option>Non</Option>
                </Select>
              </div>
            </div>
          </div>

          <div className="mb-16 pt-4 pb-6  border border-white rounded-xl bg-white w-9/12 mx-auto">
            <Typography color="blue" variant="h5">
              Détails du Traitement
            </Typography>
            <div className="border-t border-blue-100 mt-4"></div>

            <div className="space-y-8 mt-6 mx-auto w-9/12">
              {traitements.map((traitement, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 border p-4 rounded-md"
                >
                  <Input
                    label={`Traitement ${index + 1}`}
                    value={traitement.medicament}
                    onChange={(e) =>
                      handleTraitementChange(
                        index,
                        "medicament",
                        e.target.value
                      )
                    }
                    className="flex-grow"
                  />
                  <div className="grid grid-cols-3 gap-4 w-full">
                    <Input
                      label="Forme Galénique"
                      value={traitement.formeGalenique}
                      onChange={(e) =>
                        handleTraitementChange(
                          index,
                          "formeGalenique",
                          e.target.value
                        )
                      }
                      className="flex-grow"
                    />
                    <Input
                      label="Dosage"
                      value={traitement.dosage}
                      onChange={(e) =>
                        handleTraitementChange(index, "dosage", e.target.value)
                      }
                      className="flex-grow"
                    />
                    <Input
                      label="Moment de prise"
                      value={traitement.momentPrise}
                      onChange={(e) =>
                        handleTraitementChange(
                          index,
                          "momentPrise",
                          e.target.value
                        )
                      }
                      className="flex-grow"
                    />
                    <Select
                      label="Avant/Après repas"
                      value={traitement.avantApresRepas}
                      onChange={(e) =>
                        handleTraitementChange(
                          index,
                          "avantApresRepas",
                          e.target.value
                        )
                      }
                      className="flex-grow"
                    >
                      <Option>Avant repas</Option>
                      <Option>Après repas</Option>
                      <Option>Avant et après repas</Option>
                    </Select>
                    <Input
                      label="Durée"
                      value={traitement.duree}
                      onChange={(e) =>
                        handleTraitementChange(index, "duree", e.target.value)
                      }
                      className="flex-grow"
                    />
                    <Select
                      label="J/S/M"
                      value={traitement.jsm}
                      onChange={(e) =>
                        handleTraitementChange(index, "jsm", e.target.value)
                      }
                      className="flex-grow"
                    >
                      <Option>Jours</Option>
                      <Option>Semaines</Option>
                      <Option>Mois</Option>
                    </Select>
                  </div>
                  <Textarea
                    label="Remarque"
                    value={traitement.remarque}
                    onChange={(e) =>
                      handleTraitementChange(index, "remarque", e.target.value)
                    }
                    className="flex-grow"
                  />
                  <IconButton
                    color="red"
                    onClick={() => handleRemoveTraitement(index)}
                    className="self-start md:self-center"
                  >
                    <MinusCircleIcon className="h-5 w-5" />
                  </IconButton>
                </div>
              ))}
              <div className="flex justify-end mt-4 mr-4">
                <IconButton color="green" onClick={handleAddTraitement}>
                  <PlusCircleIcon className="h-5 w-5" />
                </IconButton>
              </div>
            </div>

            <div className="w-7/12 mx-auto mt-4">
              <Textarea
                label="Remarque Générale sur le traitement"
                value={remarqueOrdonnance}
                className=" flex-grow"
                onChange={(e) => setRemarqueOrdonnance(e.target.value)}
              />
            </div>
          </div>

          <div className="py-2 mb-16 px-4  border-white rounded-xl bg-white w-52 mx-auto">
            <div className="flex justify-center items-center align-middle">
              <Input
                label="Prix consultation"
                value={prixConsultation}
                onChange={(e) => setPrixConsultation(e.target.value)}
                className="w-48"
              />
            </div>
          </div>

          <div className="mt-6 mb-16 flex space-x-4 justify-center align-middle items-center">
            <Button
              color="blue"
              onClick={handleDownloadPDF}
              className="w-48 h-14"
            >
              Visualiser l'ordonnance (PDF)
            </Button>
            <Button
              color="green"
              onClick={() => {
                // navigate("/dashboard");
              }}
              className="w-48 h-14"
            >
              Fin de Consultation
            </Button>
            <Button
              color="red"
              onClick={() => {
                // navigate("/home");
              }}
              className="w-48 h-14"
            >
              Annuler la Consultation
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default DoctorConsultation;
