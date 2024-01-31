const express = require("express");
const router = express.Router();
const db = require("../models/db.js");

// GET /dosen
router.get("/", (req, res) => {
  db.query("SELECT * FROM dosen", (error, results) => {
    if (error) {
      console.error("Error fetching dosen:", error);
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

// GET /dosen/:nip
router.get("/:nip", (req, res) => {
  const dosenNip = req.params.nip;
  db.query(
    "SELECT * FROM dosen WHERE nip = ?",
    [dosenNip],
    (error, results) => {
      if (error) {
        console.error("Error fetching dosen:", error);
        res.status(500).json({ message: "Internal Server Error" });
      } else if (results.length === 0) {
        res.status(404).json({ message: "Dosen not found" });
      } else {
        res.json(results[0]);
      }
    }
  );
});

// POST /dosen
router.post("/", (req, res) => {
  const { nip, nama, gender, alamat } = req.body;

  db.query(
    "INSERT INTO dosen (nip, nama, gender, alamat) VALUES (?, ?, ?, ?)",
    [nip, nama, gender, alamat],
    (error) => {
      if (error) {
        console.error("Error inserting dosen:", error);
        res.status(500).json({ message: "Internal Server Error" });
      } else {
        res.json("Inserting dosen Successfully");
      }
    }
  );
});

// PUT /dosen/:nip
router.put("/:nip", (req, res) => {
  const dosenNip = req.params.nip;
  const { nama, gender, alamat } = req.body;

  db.query(
    "UPDATE dosen SET nama = ?, gender = ?, alamat = ? WHERE nip = ?",
    [nama, gender, alamat, dosenNip],
    (error) => {
      if (error) {
        console.error("Error updating dosen:", error);
        res.status(500).json({ message: "Internal Server Error" });
      } else {
        res.json("Updating dosen Successfully");
      }
    }
  );
});

// DELETE /dosen/:nip
router.delete("/:nip", (req, res) => {
  const dosenNip = req.params.nip;

  db.query("DELETE FROM dosen WHERE nip = ?", [dosenNip], (error) => {
    if (error) {
      console.error("Error deleting dosen:", error);
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      res.json("Deleting dosen Successfully");
    }
  });
});

module.exports = router;