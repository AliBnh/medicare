const documentsService = require("../services/documentsService");
const { verify } = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

exports.getDocuments = async (req, res) => {
  const clinicDbName = req.headers["clinic-database"];
  const role = req.headers["role"];
  const accessToken = req.headers["access-token"];
  const decoded = verify(accessToken, "jwtsecretplschange");
  const id = decoded.id;

  try {
    const result = await documentsService.getDocuments(clinicDbName, role, id);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getDocument = async (req, res) => {
  const clinicDbName = req.headers["clinic-database"];
  const role = req.headers["role"];
  const accessToken = req.headers["access-token"];
  const decoded = verify(accessToken, "jwtsecretplschange");
  const id = decoded.id;
  const documentId = req.params.id;

  try {
    const result = await documentsService.getDocument(
      clinicDbName,
      role,
      id,
      documentId
    );
    if (result) {
      res.send(result);
    } else {
      res.status(404).json({ error: "Document not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// exports.createDocument = async (req, res) => {
//   const clinicDbName = req.headers["clinic-database"];
//   const document = req.body;
//   try {
//     const result = await documentsService.createDocument(
//       clinicDbName,
//       document
//     );

//     const pdfBuffer = Buffer.from(document, "base64");
//     const dir = path.join(
//       __dirname,
//       "..",
//       "..",
//       "medicare-clinics-management",
//       "documents"
//     );
//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir, { recursive: true });
//     }
//     const filePath = path.join(
//       dir,
//       `${new Date().toISOString().split("T")[0]}_consultation.pdf`
//     );
//     fs.writeFile(filePath, pdfBuffer, (err) => {
//       if (err) {
//         console.error("Error writing the file:", err);
//         return res.status(500).json({ error: "Internal Server Error" });
//       }
//       console.log("Document saved successfully");
//       res
//         .status(201)
//         .json({ message: "Document saved successfully", filePath });
//     });
//     res.status(201).send(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
exports.createDocument = async (req, res) => {
  const clinicDbName = req.headers["clinic-database"];
  const { document, type, doctor_id, appointment_id, patient_id } = req.body;
  
  if (!document || typeof document !== "string") {
    return res.status(400).json({ error: "Invalid document data" });
  }
  const pdfBuffer = Buffer.from(document, "base64");
  const dir = path.join(
    __dirname,
    "..",
    "..",
    "..", 
    "documents"
  );
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const filePath = path.join(
    dir,
    `${new Date().toISOString().split("T")[0]}_consultation.pdf`
  );
  fs.writeFile(filePath, pdfBuffer, (err) => {
    if (err) {
      console.error("Error writing the file:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    console.log("Document saved successfully");
    res.status(201).json({ message: "Document saved successfully", filePath });
  });


  
};
exports.deleteDocument = async (req, res) => {
  const clinicDbName = req.headers["clinic-database"];
  const role = req.headers["role"];
  const accessToken = req.headers["access-token"];
  const decoded = verify(accessToken, "jwtsecretplschange");
  const id = decoded.id;
  const documentId = req.params.id;

  try {
    const result = await documentsService.deleteDocument(
      clinicDbName,
      role,
      id,
      documentId
    );
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Document deleted successfully" });
    } else {
      res.status(404).json({ error: "Document not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
