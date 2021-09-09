const express = require('express')
const app= express();
const cors= require("cors")
const pool= require('./db')

//midleaware
//conecion de servicio backend con fronted
app.use(cors());
//para que lea los body
app.use(express.json());

//routes



//cretea todo
app.post('/tareas', async(req,res)=>{
    const {description}= req.body;
    console.log(description);
    try {
       
       const newTarea= await pool.query("INSERT INTO tarea (description) VALUES ($1) RETURNING * ",[description] );
       //RES.JSON
       res.json(newTarea.rows[0])
    } catch (error) {
        console.log(error);
    }
})

//get all a todo
app.get('/tareas' , async(req , res)=>{
    try {
        const allTareas= await pool.query("SELECT * FROM tarea ")
        res.json(allTareas.rows)
    } catch (error) {
        console.log("get "+error);
    }
   

})

// get uno

app.get('/tareas/:id' , async(req , res)=>{
    
    const {id}= req.params
    try {

        const idTareas= await pool.query("SELECT * FROM tarea WHERE tarea_id=$1",[id])
        if (idTareas.rows.length!=0) {
            return res.json(idTareas.rows[0])
        } else {
            return res.json({
            message:"no se encontro la tarea"
            })
        }

        


    } catch (error) {
        console.log("get "+error);
    }
   

})

//update a todo
app.put('/tareas/:id' , async(req , res)=>{
    
    const {id}= req.params
    const { description}= req.body;
    try {


        const idTareas= await pool.query("UPDATE tarea SET description = $1  WHERE tarea_id=$2 ",[description,id])
        if (idTareas.rowCount===1) {
            return res.json("tarea actualizada")
        } else {
            return res.json({
            message:"no se encontro la tarea"
            })
        }

        


    } catch (error) {
        console.log("get "+error);
    }
   

})

//delete a todo

app.delete('/tareas/:id' , async(req , res)=>{
    
    const {id}= req.params
    try {

        const idTareas= await pool.query("DELETE FROM tarea WHERE tarea_id=$1",[id])
        if (idTareas.rowCount===1) {
            return res.json("tarea borrada con exito")
        } else {
            return res.json({
            message:"no se encontro la tarea"
            })
        }

        


    } catch (error) {
        console.log("get "+error);
    }
   

})

app.listen(5001,()=>{
    console.log("server inicio en 5001");
})