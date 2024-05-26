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
  const { id: patientId } = req.params;

  try {
    const documents = await documentsService.getDocumentsByPatient(
      clinicDbName,
      patientId
    );

    if (documents.length === 0) {
      return res
        .status(404)
        .json({ error: "No documents found for this patient" });
    }

    const documentsWithContent = documents.map((doc) => {
      const filePath = path.join(
        __dirname,
        "..",
        "..",
        "..",
        "documents",
        doc.document
      );
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, { encoding: "base64" });
        return { ...doc, content };
      } else {
        return { ...doc, content: null };
      }
    });

    res.status(200).json(documentsWithContent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createDocument = async (req, res) => {
  const clinicDbName = req.headers["clinic-database"];
  const document = req.body;
  const result = await documentsService.createDocument(clinicDbName, document);
  if (!document.document || typeof document.document !== "string") {
    return res.status(400).json({ error: "Invalid document data" });
  }
  const pdfBuffer = Buffer.from(document.document, "base64");
  const dir = path.join(__dirname, "..", "..", "..", "documents");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const filePath = path.join(
    dir,
    `${new Date().toISOString().split("T")[0]}_${document.type}_${
      document.patient_id
    }_${document.doctor_id}_${document.appointment_id}.pdf`
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
  const { id } = req.params;
  try {
    const result = await documentsService.deleteDocument(clinicDbName, id);
    if (result) {
      const filePath = path.join(
        __dirname,
        "..",
        "..",
        "..",
        "documents",
        result.filename
      );
      console.log("Deleting file:", filePath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      res.status(200).json({ message: "Document deleted successfully" });
    } else {
      res.status(404).json({ error: "Document not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
