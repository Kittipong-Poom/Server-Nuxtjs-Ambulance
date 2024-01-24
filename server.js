// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');

 
import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'
import mysql from 'mysql2/promise'

const app = express();
const port = 5000; // You can choose any port you prefer
 
// Middleware 
app.use(cors());
app.use(bodyParser.json());

// CRUD operations
let patients = []
let jobs =[]

let conn = null

const Mysqlinit = async () =>{
  conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ambulance',
    port: 3306
  })
}

// Get all patients
app.get('/api/patients', async (req, res) => {
  try{
    const results = await conn.query('SELECT * FROM patients')
    res.json(results[0])
  }catch (error){
    console.error('Error fectching patient: ',error.message)
    res.status(500).json({error:'Error fectching patients'})
  }
  
});

app.get('/api/jobs', async (req, res) => {
  try{
    const results = await conn.query('SELECT * FROM jobs')
    res.json(results[0])
  }catch (error){
    console.error('Error fectching jobs: ',error.message)
    res.status(500).json({error:'Error fectching jobs'})
  }
});

app.get('/api/patients/:id', async (req,res) =>{
  try{
    let id = req.params.id;
    const results = await conn.query('SELECT * FROM patients WHERE id = ?', id)
    if(results[0].length == 0 ){
      throw { statusCode :404,message:'หาไม่เจอ'}
      
    }
    res.json(results[0][0]);
  }catch(error){ 
    console.error('Error fetching patient by id:', error.message);
    let statusCode = error.statusCode || 500
    res.status(statusCode).json({ error: 'Something went wrong fetching patient by id' });
  }
})

app.get('/api/jobs/:id', async (req, res) => {
  try{
    let id = req.params.id;
    const results = await conn.query('SELECT * FROM jobs WHERE id = ?', id)
    if(results[0].length == 0 ){
      throw { statusCode :404,message:'หาไม่เจอ'}
      
    }
    res.json(results[0][0]);
  }catch(error){ 
    console.error('Error fetching jobs by id:', error.message);
    let statusCode = error.statusCode || 500
    res.status(statusCode).json({ error: 'Something went wrong fetching jobs by id' });
  }
});


app.post('/api/patients', async (req, res) => {
  try {
    const newPatient = req.body;
    const [results] = await conn.query('INSERT INTO patients SET ?', [newPatient]);
    newPatient.id = results.insertId;
    res.json(newPatient);
  } catch (error) {
    console.error('Error executing MySQL query:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/jobs', async (req, res) => {
  try {
    const newJobs = req.body;
    const [results] = await conn.query('INSERT INTO jobs SET ?', [newJobs]);
    newJobs.id = results.insertId;
    res.json(jobs);
  } catch (error) {
    console.error('Error executing MySQL query:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a patient
app.put('/api/patients/:id', async (req, res) => {
  try{
    let id = req.params.id
    const updatepatient = req.body
    const results = await conn.query('UPDATE patients SET ? WHERE id = ?', [updatepatient,id])
    res.json(results[0])
    console.log('updatepatient', updatepatient);
  }catch(error){
    console.error('Error data cannot Update patient',error.message)
    res.status(500).json({error:'อัพเดตไม่ได้'})
  }
});

app.put('/api/jobs/:id', async (req, res) => {
  try{
    let id = req.params.id
    const updatejobs = req.body
    const results = await conn.query('UPDATE jobs SET ? WHERE id = ?', [updatejobs,id])
    res.json(results[0])
    console.log('updatejobs', updatejobs);
  }catch(error){
    console.error('Error data cannot Update jobs',error.message)
    res.status(500).json({error:'อัพเดตไม่ได้'})
  }
});
 
// Delete a patient
app.delete('/api/patients/:id', async (req, res) => {
  try{
    let id = req.params.id
    const results = await conn.query('DELETE FROM patients WHERE id = ?',id)
    res.json({
      message:'delete ok',
      data:results[0]
    })
  }catch(error){
    console.error('Error cannot delete data',error.message)
    res.status(500).json({error:'ลยไม่ได้'})
  }
});

app.delete('/api/jobs/:id', async (req, res) => {
  try{
    let id = req.params.id
    const results = await conn.query('DELETE FROM jobs WHERE id = ?',id)
    res.json({
      message:'delete ok',
      data:results[0]
    })
  }catch(error){
    console.error('Error cannot delete data',error.message)
    res.status(500).json({error:'ลยไม่ได้'})
  }
});

app.listen(port, async () => {
  await Mysqlinit()
  console.log(`Server is running on http://localhost:${port}`);
});
