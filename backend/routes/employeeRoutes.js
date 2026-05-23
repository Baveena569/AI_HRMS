const express = require("express");
const router = express.Router();

const {
  addEmployee,
  getEmployees,
  deleteEmployee,
  updateEmployee,
} = require("../controllers/employeeController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// ADD
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin"]),
  addEmployee
);

// GET
router.get(
  "/",
  authMiddleware,
  getEmployees
);

// DELETE
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteEmployee
);

// UPDATE
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  updateEmployee
);

module.exports = router;