// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql2/promise";
import 'dotenv/config'

const app = express();
const port =  5000;
  


app.use(cors());
app.use(bodyParser.json());
  
let conn = null;
const Myserverambulance = async () => {
  try { 
    conn = await mysql.createConnection({
      host: process.env.DB_HOST ||"DESKTOP-PAL0K41",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "MFUdatabase548779",
      database: process.env.DB_NAME || "ambulance",
      port: process.env.DB_PORT || 3306,
    });
    console.log("Connected to MySQL!");
  } catch (error) {
    console.error("Error connecting to MySQL:", error);
  }
};

Myserverambulance();
// Get all patients
app.get("/api/patients", async (req, res) => {
  try {
    const results = await conn.query(
      `SELECT *
      FROM patient
      JOIN ages ON patient.ages_id = ages.age_id
      JOIN type_patient ON patient.type_patient_id = type_patient.type_patient_id
      JOIN tracking_patient ON patient.tracking_patient_id = tracking_patient.tracking_id
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
      FROM patient
      JOIN ages ON patient.ages_id = ages.age_id
      JOIN type_patient ON patient.type_patient_id = type_patient.type_patient_id
      JOIN tracking_patient ON patient.tracking_patient_id = tracking_patient.tracking_id
      JOIN status_case ON patient.status_case_id = status_case.casestatus_id
      WHERE patient.time IS NOT NULL OR patient.time != '';
      `
    );
    res.json(results[0]);
  } catch (error) {
    console.error("Error fectching patient: ", error.message);
    res.status(500).json({ error: "Error fectching patients" });
  }
});
app.get("/api/patients/:hn_id", async (req, res) => {
  try {
    const hn_id = req.params.hn_id;
    const [results] = await conn.query("SELECT * FROM patient WHERE hn_id = ?", [hn_id]);
    const appointment = results[0];
    res.json(appointment);
  } catch (error) {
    console.error("Error executing MySQL query:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
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

app.get("/api/appointment", async (req, res) => {
  try {
    const results = await conn.query("SELECT * FROM appointment ");
    res.json(results[0]);
  } catch (error) {
    console.error("Error fectching caseurgents: ", error.message);
    res.status(500).json({ error: "Error fectching caseurgents" });
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

app.get("/api/gettype/service/other", async (req, res) => {
  try {
    const results = await conn.query(
      'SELECT * FROM `patient` WHERE type_patient_id = "6"'
    );
    res.json(results[0]);
  } catch (error) {
    console.error("Error fectching service other: ", error.message);
    res.status(500).json({ error: "Error fectching service other" });
  }
});

app.get("/api/serviceCount", async (req, res) => {
  try {
    const results = await conn.query(
      'SELECT * FROM `patient` WHERE type_patient_id = "4"'
    );
    res.json(results[0]);
  } catch (error) {
    console.error("Error fectching serviceCount: ", error.message);
    res.status(500).json({ error: "Error fectching serviceCount" });
  }
});

app.get("/api/bedCount", async (req, res) => {
  try {
    const results = await conn.query(
      'SELECT * FROM `patient` WHERE type_patient_id = "5"'
    );
    res.json(results[0]);
  } catch (error) {
    console.error("Error fectching bedCount: ", error.message);
    res.status(500).json({ error: "Error fectching bedCount" });
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

app.get("/api/patients/:hn_id", async (req, res) => {
  try {
    let hn_id = req.params.hn_id;
    const results = await conn.query("SELECT * FROM patient WHERE hn_id = ?",hn_id);
    if (results[0].length == 0) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.json(results[0][0]);
  } catch (error) {
    console.error("Error fetching patient by hn_id:", error.message);
    let statusCode = error.statusCode || 500;
    res.status(statusCode).json({ error: "Something went wrong fetching patient by hn_id" });
  }
});


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
    const [results] = await conn.query("INSERT INTO patient SET ?", [
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
app.post("/api/appointments", async (req, res) => {
  try {
    const newAppointment = req.body; // รับข้อมูลทั้งหมดจาก request body

    // ปรับรูปแบบข้อมูลที่ส่งไปให้เข้ากับโครงสร้างของตาราง appointments
    const appointmentData = {
      service_date: newAppointment.service_date,
      time: newAppointment.time,
      hn: newAppointment.hn,
      status_case_id: newAppointment.status_case_id,
      lati: newAppointment.lati,
      longi: newAppointment.longi,
      number: newAppointment.number,
      address: newAppointment.address,
    };
 
    const sql = "INSERT INTO appointments SET ?"; // ใช้ parameterized query

    const [results] = await conn.query(sql, appointmentData);

    appointmentData.id = results.insertId;
    console.log("Inserted Appointment:", [appointmentData]); // Log inserted appointment
    res.json(appointmentData);
  } catch (error) {
    console.error("Error executing MySQL query:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}); 
app.get("/api/appointment/:hn", async (req, res) => {
  try {
    const hn = req.params.hn; 
    const [results] = await conn.query(
      `SELECT 
        appointments.hn,
        appointments.service_date,
        appointments.time,
        appointments.status_case_id,
        appointments.number
      FROM 
        appointments
      JOIN 
      patient
      ON 
        appointments.hn = patient.hn
      WHERE 
        appointments.hn = ?`, 
      [hn]
    );
    if (results.length === 0) {
      return res.status(404).json({ message: "No appointments found for this hn" });
    }
    res.json(results);
  } catch (error) {
    console.error("Error fetching appointments: ", error.message);
    res.status(500).json({ error: "Error fetching appointments" });
  }
});

app.get("/api/appointments", async (req, res) => {
  try {
    const results = await conn.query(
      `SELECT *
      FROM appointments
      `  
    );
    res.json(results[0]);
  } catch (error) {
    console.error("Error fectching patient: ", error.message);
    res.status(500).json({ error: "Error fectching patients" });
  }
});

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
    const results = await conn.query("UPDATE patient SET ? WHERE hn_id = ?", [
      updatepatient,
      hn_id,
    ]);
    res.json(results[0]);
    console.log("updatepatient", updatepatient);
  } catch (error) {
    console.error("Error data cannot Update patientsedit", error.message);
    res.status(500).json({ error: "อัพเดตไม่ได้" });
  }
});

app.put("/api/patientsedit/:hn_id", async (req, res) => {
  try {
    const hn_id = req.params.hn_id;
    const updatepatient = req.body;
    
    const results = await conn.query("UPDATE patient SET ? WHERE hn_id = ?", [
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

app.put("/api/appointments/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateappointment = req.body;
    
    const results = await conn.query("UPDATE appointments SET ? WHERE id = ?", [
      updateappointment,
      id,
    ]);
    res.json(results[0]);
    console.log("appointment", updateappointment);
  } catch (error) {
    console.error("Error data cannot Update patient", error.message);
    res.status(500).json({ error: "อัพเดตไม่ได้" });
  }
}); 

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
app.delete("/api/patients/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const results = await conn.query(
      "DELETE FROM patient WHERE hn_id = ?",
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

app.delete("/api/appointments/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const results = await conn.query(
      "DELETE FROM appointments WHERE hn = ?",
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

//เลือก select all หน้า QueueJob
app.delete("/api/appointmentsall/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const results = await conn.query(
      "DELETE FROM appointments WHERE id = ?",
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

app.get('/api/latlongurgent', async (req, res) => {
  try {
    const results = await conn.query('SELECT lati, longi,status FROM caseurgents');
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
 
app.get('/api/latlongappoint', async (req, res) => {
  try {
    const results = await conn.query('SELECT lati , longi , status_case_id FROM appointments');
    if (results[0].length === 0) {
      throw { statusCode: 404, message: 'ไม่พบข้อมูลพิกัด' };
    }
    res.json(results[0]);
  } catch (error) {
    console.error('Error fetching all caseurgents:', error.message);
    let statusCode = error.statusCode ||  500;
    res.status(statusCode).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูลพิกัดทั้งหมด' });
  }
});
 

app.get("/api/admin/login", async (req, res) => {
  try {
    const { username, password } = req.query;

    console.log('เข้ารหัส:', username, password);

    // ค้นหาข้อมูลผู้ใช้ในฐานข้อมูลโดยใช้ค่าแฮชที่ได้รับ
    const [results] = await conn.query(
      `
      SELECT 
        admin.username, admin.password
      FROM 
        admin
      WHERE 
      (admin.username) = ? AND (admin.password) = ?`,
      [username, password]
    );

    if (results.length === 0) {
      return res.status(401).json({ success: false, message: "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง" });
    }

    res.json({ success: true, user: results[0] });
  } catch (error) {
    console.error("Error fetching admin data: ", error.message);
    res.status(500).json({ success: false, error: "Error fetching admin data" });
  }
});
app.listen(port, async () => {
  await Myserverambulance();
  console.log(`Server is running on http://localhost:${port}`);
});