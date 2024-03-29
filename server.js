// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

let conn = null;

const Mysqlinit = async () => {
  conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "ambulance3",
    port: 3306,
  });
};

// Get all patients
app.get("/api/patients", async (req, res) => {
  try {
    const results = await conn.query(
      `SELECT *
      FROM ambulance
      JOIN ages ON ambulance.ages_id = ages.age_id
      JOIN type_patient ON ambulance.type_patient_id = type_patient.type_patient_id
      JOIN tracking_patient ON ambulance.tracking_patient_id = tracking_patient.tracking_id
      WHERE ambulance.time IS NULL OR ambulance.time = '';
      `
    );
    res.json(results[0]);
  } catch (error) {
    console.error("Error fectching patient: ", error.message);
    res.status(500).json({ error: "Error fectching patients" });
  }
});
// Get all patients
app.get("/api/patients/time", async (req, res) => {
  try {
    const results = await conn.query(
      `SELECT *
      FROM ambulance
      JOIN ages ON ambulance.ages_id = ages.age_id
      JOIN type_patient ON ambulance.type_patient_id = type_patient.type_patient_id
      JOIN tracking_patient ON ambulance.tracking_patient_id = tracking_patient.tracking_id
      JOIN status_case ON ambulance.status_case_id = status_case.casestatus_id
      WHERE ambulance.time IS NOT NULL OR ambulance.time != '';
      `
    );
    res.json(results[0]);
  } catch (error) {
    console.error("Error fectching patient: ", error.message);
    res.status(500).json({ error: "Error fectching patients" });
  }
});

// Get all Ages
app.get("/api/ages", async (req, res) => {
  try {
    const results = await conn.query("SELECT * FROM ages");
    res.json(results[0]);
  } catch (error) {
    console.error("Error fectching ages: ", error.message);
    res.status(500).json({ error: "Error fectching ages" });
  }
});

app.get("/api/tracking_patient", async (req, res) => {
  try {
    const results = await conn.query("SELECT * FROM tracking_patient");
    res.json(results[0]);
  } catch (error) {
    console.error("Error fectching tracking_patient: ", error.message);
    res.status(500).json({ error: "Error fectching tracking_patient" });
  }
});

app.get("/api/type_patient", async (req, res) => {
  try {
    const results = await conn.query("SELECT * FROM type_patient");
    res.json(results[0]);
  } catch (error) {
    console.error("Error fectching type_patient: ", error.message);
    res.status(500).json({ error: "Error fectching type_patient" });
  }
});

app.get("/api/status", async (req, res) => {
  try {
    const results = await conn.query("SELECT * FROM status_case");
    console.log(results);
    res.json(results[0]);
  } catch (error) {
    console.error("Error fectching status_case: ", error.message);
    res.status(500).json({ error: "Error fectching status_case" });
  }
});

app.get("/api/caseurgents", async (req, res) => {
  try {
    const results = await conn.query("SELECT * FROM caseurgents");
    res.json(results[0]);
  } catch (error) {
    console.error("Error fectching caseurgents: ", error.message);
    res.status(500).json({ error: "Error fectching caseurgents" });
  }
});

app.get("/api/gettype", async (req, res) => {
  try {
    const results = await conn.query(
      'SELECT * FROM `ambulance` WHERE type_patient_id = "5"'
    );
    res.json(results[0]);
  } catch (error) {
    console.error("Error fectching caseurgents: ", error.message);
    res.status(500).json({ error: "Error fectching caseurgents" });
  }
});

app.get("/api/gettype/service", async (req, res) => {
  try {
    const results = await conn.query(
      'SELECT * FROM `ambulance` WHERE type_patient_id = "4"'
    );
    res.json(results[0]);
  } catch (error) {
    console.error("Error fectching caseurgents: ", error.message);
    res.status(500).json({ error: "Error fectching caseurgents" });
  }
});

app.get("/api/gettype/service/other", async (req, res) => {
  try {
    const results = await conn.query(
      'SELECT * FROM `ambulance` WHERE type_patient_id = "6"'
    );
    res.json(results[0]);
  } catch (error) {
    console.error("Error fectching caseurgents: ", error.message);
    res.status(500).json({ error: "Error fectching caseurgents" });
  }
});

app.get("/api/getviolence", async (req, res) => {
  try {
    const results = await conn.query(
      'SELECT * FROM `caseurgents` WHERE violence = "ผู้ป่วยฉุกเฉินวิกฤติ"'
    );
    res.json(results[0]);
  } catch (error) {
    console.error("Error fectching caseurgents: ", error.message);
    res.status(500).json({ error: "Error fectching caseurgents" });
  }
});

app.get("/api/getviolence/yellow", async (req, res) => {
  try {
    const results = await conn.query(
      'SELECT * FROM `caseurgents` WHERE violence = "ผู้ป่วยฉุกเฉินเร่งด่วน"'
    );
    res.json(results[0]);
  } catch (error) {
    console.error("Error fectching caseurgents: ", error.message);
    res.status(500).json({ error: "Error fectching caseurgents" });
  }
});

app.get("/api/getviolence/green", async (req, res) => {
  try {
    const results = await conn.query(
      'SELECT * FROM `caseurgents` WHERE violence = "ผู้ป่วยไม่ฉุกเฉิน"'
    );
    res.json(results[0]);
  } catch (error) {
    console.error("Error fectching caseurgents: ", error.message);
    res.status(500).json({ error: "Error fectching caseurgents" });
  }
});

app.get("/api/getviolence/white", async (req, res) => {
  try {
    const results = await conn.query(
      'SELECT * FROM `caseurgents` WHERE violence = "ผู้ป่วยทั่วไป"'
    );
    res.json(results[0]);
  } catch (error) {
    console.error("Error fectching caseurgents: ", error.message);
    res.status(500).json({ error: "Error fectching caseurgents" });
  }
});

app.get("/api/patients/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const results = await conn.query("SELECT * FROM patients WHERE id = ?", id);
    if (results[0].length == 0) {
      throw { statusCode: 404, message: "หาไม่เจอ" };
    }
    res.json(results[0][0]);
  } catch (error) {
    console.error("Error fetching patient by id:", error.message);
    let statusCode = error.statusCode || 500;
    res
      .status(statusCode)
      .json({ error: "Something went wrong fetching patient by id" });
  }
});

// app.get("/api/jobs/:id", async (req, res) => {
//   try {
//     let id = req.params.id;
//     const results = await conn.query("SELECT * FROM jobs WHERE id = ?", id);
//     if (results[0].length == 0) {
//       throw { statusCode: 404, message: "หาไม่เจอ" };
//     }
//     res.json(results[0][0]);
//   } catch (error) {
//     console.error("Error fetching jobs by id:", error.message);
//     let statusCode = error.statusCode || 500;
//     res
//       .status(statusCode)
//       .json({ error: "Something went wrong fetching jobs by id" });
//   }
// });

app.get("/api/caseurgents/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const results = await conn.query(
      "SELECT * FROM caseurgents WHERE id = ?",
      id
    );
    if (results[0].length == 0) {
      throw { statusCode: 404, message: "หาไม่เจอ" };
    }
    res.json(results[0][0]);
  } catch (error) {
    console.error("Error fetching caseurgents by id:", error.message);
    let statusCode = error.statusCode || 500;
    res
      .status(statusCode)
      .json({ error: "Something went wrong fetching caseurgents by id" });
  }
});

//โพส ไปใน ambulance
app.post("/api/patients", async (req, res) => {
  try {
    const newPatient = req.body;
    const [results] = await conn.query("INSERT INTO ambulance SET ?", [
      newPatient,
    ]);
    console.log(newPatient);
    newPatient.id = results.insertId;
    res.json(newPatient);
  } catch (error) {
    console.error("Error executing MySQL query:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// app.post("/api/jobs", async (req, res) => {
//   try {
//     const newJob = req.body;
//     const [results] = await conn.query("INSERT INTO jobs SET ?", newJob);

//     newJob.id = results.insertId;
//     console.log("Inserted job:", newJob); // Log inserted job
//     res.json(newJob);
//   } catch (error) {
//     console.error("Error executing MySQL query:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

app.post("/api/caseurgents", async (req, res) => {
  try {
    const newUrgents = req.body;
    const sql = "INSERT INTO caseurgents SET ?"; // Using a parameterized query

    const [results] = await conn.query(sql, newUrgents);

    newUrgents.id = results.insertId;
    console.log("Inserted Urgents:", [newUrgents]); // Log inserted job
    res.json(newUrgents);
  } catch (error) {
    console.error("Error executing MySQL query:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a patient
app.put("/api/patients/:hn_id", async (req, res) => {
  try {
    const hn_id = req.params.hn_id;
    const updatepatient = req.body;
    const results = await conn.query("UPDATE ambulance SET ? WHERE hn_id = ?", [
      updatepatient,
      hn_id,
    ]);
    res.json(results[0]);
    console.log("updatepatient", updatepatient);
  } catch (error) {
    console.error("Error data cannot Update patient", error.message);
    res.status(500).json({ error: "อัพเดตไม่ได้" });
  }
});

app.put("/api/patientsedit/:hn_id", async (req, res) => {
  try {
    const hn_id = req.params.hn_id;
    const updatepatient = req.body;
    const results = await conn.query("UPDATE ambulance SET ? WHERE hn_id = ?", [
      updatepatient,
      hn_id,
    ]);
    res.json(results[0]);
    console.log("updatepatient", updatepatient);
  } catch (error) {
    console.error("Error data cannot Update patient", error.message);
    res.status(500).json({ error: "อัพเดตไม่ได้" });
  }
});


// app.put("/api/jobs/:id", async (req, res) => {
//   try {
//     let id = req.params.id;
//     const updatejobs = req.body;
//     const results = await conn.query("UPDATE jobs SET ? WHERE id = ?", [
//       updatejobs,
//       id,
//     ]);
//     res.json(results[0]);
//     console.log("updatejobs", updatejobs);
//   } catch (error) {
//     console.error("Error data cannot Update jobs", error.message);
//     res.status(500).json({ error: "อัพเดตไม่ได้" });
//   }
// });

app.put("/api/caseurgents/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const updateurgents = req.body;
    const results = await conn.query(
      "UPDATE caseurgents SET ? WHERE caseurgent_id = ?",
      [updateurgents, id]
    );
    res.json(results[0]);
    console.log("updateurgents", updateurgents);
  } catch (error) {
    console.error("Error data cannot Update caseurgents", error.message);
    res.status(500).json({ error: "อัพเดตไม่ได้" });
  }
});

// Delete a patient
app.delete("/api/patients/:hn_id", async (req, res) => {
  try {
    let hn_id = req.params.hn_id;
    const results = await conn.query(
      "DELETE FROM ambulance WHERE hn_id = ?",
      hn_id
    );
    res.json({
      message: "delete ok",
      data: results[0],
    });
  } catch (error) {
    console.error("Error cannot delete data", error.message);
    res.status(500).json({ error: "ลบไม่ได้" });
  }
});

// app.delete("/api/jobs/:id", async (req, res) => {
//   try {
//     let id = req.params.id;
//     const results = await conn.query("DELETE FROM jobs WHERE id = ?", id);
//     res.json({
//       message: "delete ok",
//       data: results[0],
//     });
//   } catch (error) {
//     console.error("Error cannot delete data", error.message);
//     res.status(500).json({ error: "ลบไม่ได้" });
//   }
// });

app.delete("/api/caseurgents/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const results = await conn.query(
      "DELETE FROM caseurgents WHERE caseurgent_id = ?",
      id
    );
    res.json({
      message: "delete ok",
      data: results[0],
    });
  } catch (error) {
    console.error("Error cannot delete data", error.message);
    res.status(500).json({ error: "ลบไม่ได้" });
  }
});

app.get('/api/latlong', async (req, res) => {
  try {
    const results = await conn.query('SELECT lati, longi FROM caseurgents');
    if (results[0].length === 0) {
      throw { statusCode: 404, message: 'ไม่พบข้อมูลพิกัด' };
    }
    res.json(results[0]);
  } catch (error) {
    console.error('Error fetching all caseurgents:', error.message);
    let statusCode = error.statusCode || 500;
    res.status(statusCode).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูลพิกัดทั้งหมด' });
  }
});


app.listen(port, async () => {
  await Mysqlinit();
  console.log(`Server is running on http://localhost:${port}`);
});
