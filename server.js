// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');

import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'

const app = express();
const port = 5000; // You can choose any port you prefer

// Middleware 
app.use(cors());
app.use(bodyParser.json());



// CRUD operations
let patients = []
let jobs =[]
// Get all patients
app.get('/api/patients', (req, res) => {
  res.json(patients);
});

app.get('/api/jobs', (req, res) => {
  res.json(jobs); 
});

// Get a specific patient
app.get('/api/patients/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const patient = patients.find(p => p.id === id);
  if (patient) {
    res.json(patients);
  } else {
    res.status(404).json({ message: 'Patient not found' });
  }
});

app.get('/api/jobs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const Job = jobs.find(p => p.id === id);
  if (Job) {
    res.json(jobs);
  } else {
    res.status(404).json({ message: 'Job not found' });
  }
});

// Add a new patient
app.post('/api/patients', (req, res) => {
  const newPatient = req.body;
  newPatient.id = patients.length + 1;
  patients.push(newPatient);
  res.json(newPatient);
});

app.post('/api/jobs', (req, res) => {
  const newJob = req.body;
  newJob.id = jobs.length + 1;
  jobs.push(newJob);
  res.json(newJob);
});

// Update a patient
app.put('/api/patients/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedPatient = req.body;
  const index = patients.findIndex(p => p.id === id);
  if (index !== -1) {
    patients[index] = { ...patients[index], ...updatedPatient };
    res.json(patients[index]);
  } else {
    res.status(404).json({ message: 'Patient not found' });
  }
});

app.put('/api/jobs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedJob = req.body;
  const index = jobs.findIndex(p => p.id === id);
  if (index !== -1) {
    jobs[index] = { ...jobs[index], ...updatedJob };
    res.json(jobs[index]);
  } else {
    res.status(404).json({ message: 'Job not found' });
  }
});

// Delete a patient
app.delete('/api/patients/:id', (req, res) => {
  const id = parseInt(req.params.id);
  patients = patients.filter(p => p.id !== id);
  res.json({ message: 'Patient deleted successfully' });
});

app.delete('/api/jobs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  jobs = jobs.filter(p => p.id !== id);
  res.json({ message: 'Job deleted successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
