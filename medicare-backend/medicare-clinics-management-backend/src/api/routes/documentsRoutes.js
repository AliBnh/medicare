const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../utils/JWT");
const {
getDocuments,
getDocument,
createDocument,
deleteDocument,
} = require("../controllers/documentsController");

router.get("/", isAuthenticated, getDocuments);
router.get("/:id", isAuthenticated, getDocument);
router.post("/", isAuthenticated, createDocument);
router.delete("/:id", isAuthenticated, deleteDocument);


module.exports = router;
