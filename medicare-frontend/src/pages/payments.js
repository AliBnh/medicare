import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import SidebarItem from "../components/Sidebar/Sidebar";
import axios from "axios";
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
  Input,
  Select,
  Option,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

function Payments() {
  const [payments, setPayments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [amountToPay, setAmountToPay] = useState("");
  const [avance, setAvance] = useState("");
  const [reste, setReste] = useState("");
  const [paymentMode, setPaymentMode] = useState("");

  const itemsPerPage = 5;
  const totalPages = Math.ceil(payments.length / itemsPerPage);

  const calculateTotalRevenues = () => {
    return payments.reduce(
      (acc, payment) => acc + Number(payment.paid_amount || 0),
      0
    );
  };

  const calculateTotalUnpaid = () => {
    return payments.reduce(
      (acc, payment) => acc + (payment.amount - payment.paid_amount),
      0
    );
  };
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem("access-token");
        const clinicDb = localStorage.getItem("clinic-database");
        const role = localStorage.getItem("role");

        const response = await axios.get(`http://localhost:3002/payments`, {
          headers: {
            "access-token": token,
            "clinic-database": clinicDb,
            role: role,
          },
        });
        const paymentsData = response.data;
        const paymentsWithPatientDetails = await Promise.all(
          paymentsData.map(async (payment) => {
            const appointmentResponse = await axios.get(
              `http://localhost:3002/appointments/${payment.appointment_id}`,
              {
                headers: {
                  "access-token": token,
                  "clinic-database": clinicDb,
                  role: role,
                },
              }
            );
            const patientId = appointmentResponse.data[0].patient_id;

            const patientResponse = await axios.get(
              `http://localhost:3002/patients/${patientId}`,
              {
                headers: {
                  "access-token": token,
                  "clinic-database": clinicDb,
                  role: "doctor",
                },
              }
            );
            const patient = patientResponse.data[0];
            return {
              ...payment,
              patientFirstName: patient.first_name,
              patientLastName: patient.last_name,
            };
          })
        );

        setPayments(paymentsWithPatientDetails);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPayments();
  }, []);

  const handleOpenModal = (payment) => {
    setSelectedPayment(payment);
    setAmountToPay(payment.amount - payment.paid_amount);
    setAvance(0);
    setReste(payment.amount - payment.paid_amount);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    window.location.reload();
  };

  const handleAvanceChange = (value) => {
    setAvance(value);
    setReste(amountToPay - value);
  };

  const handlePayment = async () => {
    const payload = {
      amount: selectedPayment.amount,
      date: selectedPayment.date,
      method: paymentMode,
      appointment_id: selectedPayment.appointment_id,
      paid_amount: selectedPayment.amount - reste,
      advanced_amount: selectedPayment.advanced_amount + avance,
      status: reste === 0 ? "paid" : "pending",
    };
    try {
      const token = localStorage.getItem("access-token");
      const clinicDb = localStorage.getItem("clinic-database");

      await axios.put(
        `http://localhost:3002/payments/${selectedPayment.id}`,
        payload,
        {
          headers: {
            "access-token": token,
            "clinic-database": clinicDb,
          },
        }
      );
      setModalOpen(false);
    } catch (error) {
      console.error("Error updating payment:", error);
    }
    window.location.reload();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getVisiblePayments = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return payments.slice(startIndex, startIndex + itemsPerPage);
  };
  const searchPayment = (value) => {
    if (value === "") {
      window.location.reload();
    }
    const token = localStorage.getItem("access-token");
    const role = localStorage.getItem("role");
    const clinicDb = localStorage.getItem("clinic-database");
    const id = localStorage.getItem("id");
    axios
      .get(`http://localhost:3002/payments/search/${value}`, {
        headers: {
          "access-token": token,
          "clinic-database": clinicDb,
          role: role,
          value: value,
          id: id,
        },
      })
      .then((respone) => {
        if (respone.data.length > 0) {
          //we should add for each payment the patient first_name and last_name, it s fetched in the query already so we can use it
          setPayments(
            respone.data.map((payment) => {
              return {
                ...payment,
                patientFirstName: payment.first_name,
                patientLastName: payment.last_name,
              };
            })
          );
        } else {
          setPayments([]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
          Paiements
        </Typography>
        <CardBody className="px-8">
          <div className="mb-4">
            <Input
              label="Rechercher par nom de patient"
              onChange={(e) => searchPayment(e.target.value)}
            />
          </div>
          <div className="overflow-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                    Date de consultation
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                    Total à payer
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                    Reste à payer
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                    Avance
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {getVisiblePayments().map((payment) => (
                  <tr key={payment.id}>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      {payment.patientFirstName} {payment.patientLastName}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      {new Intl.DateTimeFormat("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }).format(new Date(payment.date))}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      {payment.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      {payment.paid_amount - payment.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      {payment.paid_amount - payment.advanced_amount}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      {payment.status === "paid" ? (
                        <span className="text-green-500">
                          <svg
                            className="w-4 h-4 inline-block fill-current"
                            viewBox="0 0 20 20"
                          >
                            <circle cx="10" cy="10" r="10" />
                          </svg>
                        </span>
                      ) : (
                        <span className="text-red-500">
                          <svg
                            className="w-4 h-4 inline-block fill-current"
                            viewBox="0 0 20 20"
                          >
                            <circle cx="10" cy="10" r="10" />
                          </svg>
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      {payment.status !== "paid" && (
                        <Button
                          color="green"
                          onClick={() => handleOpenModal(payment)}
                        >
                          Payer
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center  mt-4">
            <Button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Précédent
            </Button>
            <span>
              Page {currentPage} sur {totalPages}
            </span>
            <Button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Suivant
            </Button>
          </div>
          <div className="flex flex-col items-center mt-20 mx-auto relative  gap-4">
            <Typography
              variant="h6"
              color="blue-gray"
              className="font-bold text-white bg-green-500 rounded-md w-72 h-7 "
            >
              Total des revenus : {calculateTotalRevenues().toFixed(0)} Dhs
            </Typography>
            <Typography
              variant="h6"
              color="blue-gray"
              className="font-bold text-white bg-red-500 rounded-md w-72 h-7"
            >
              Total des impayés : {calculateTotalUnpaid().toFixed(0)} Dhs
            </Typography>
          </div>
        </CardBody>
      </Card>

      <Dialog open={modalOpen} handler={handleCloseModal}>
        <DialogBody>
          <Typography variant="h5" color="blue-gray" className="mb-4">
            Paiement pour {selectedPayment?.patientFirstName}{" "}
            {selectedPayment?.patientLastName}
          </Typography>
          <div className="mb-4">
            <Input
              label="Montant total"
              value={amountToPay}
              onChange={(e) => setAmountToPay(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <Input
              label="Avance"
              value={avance}
              onChange={(e) => handleAvanceChange(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <Input label="Le reste" value={reste} disabled />
          </div>
          <div className="mb-4">
            <Select
              label="Mode de paiement"
              onChange={(e) => setPaymentMode(e)}
            >
              <Option value="cash">Cash</Option>
              <Option value="card">Carte</Option>
            </Select>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button color="red" onClick={handleCloseModal} className="mr-4">
            Annuler
          </Button>
          <Button color="green" onClick={handlePayment}>
            Confirmer
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default Payments;
