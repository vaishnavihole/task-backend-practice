const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const app = express();
const Task = require("./model/Task")
app.use(express.json())

const PORT = process.env.PORT ||5000;


// temp database 
let tasks = []


mongoose.connect("process.env.MONGIDB_URI",()=>{
    console.log("Connected to mongoDB database")

})


// Create a task 
app.post('/tasks',async(req,res) =>{
    const task = new Task({
        id : req.body.id,
        title: req.body.title,
        description:req.body.description,
        priority:req.body.priority,
        emoji:req.body.emoji, 
    })

    const savedTask = await task.save();

res.json({
    'status':'success',
    data : savedTask
})

});
     
// to read all task
app.get('/tasks',async(req,res)=>{//

 const tasks = await Task.find()
 res.json({
    'status':'success',
    'data':alltasks
   }) 
})

// read specific task 
app.post('/get_task',async(req,res)=>{
    const id = req.body.id;

    const specificTask = awaitTask.findOne({id: id});

   // let resultTask;
   // tasks.map((task)=>{
      //  if(task.id === id) {
       //  resultTask = task;
       // }
  // })
    res.json({
        'status':'sucess',
        'data':resultTask,
    })
})

// delete all Task

app.post('/delete_task',async(req,res)=>{

    const result = await Task.deleteMany();
     //tasks = []

    res.json({
        'status': 'success',
        'message': "Successfully deleted all tasks",
        'data': result
    })
})

// Delete specific task by id 

app.post('/delete_task',async(req,res)=>{
    const id = req.body.id;
    const result = await Task.deleteOne({id: id});

    //let index = -1;
    //tasks.map((task)=>{
       // if(id===task.id)
        //{
           // index = i;
      // }
    //})

    // tasks.splice(index,1)

    res.json({
        'status':'success',
        'data':tasks
    })
})
// Update 
app.post('/update_task',async(req,res)=>{

    const id = req.body.id;
    const title= req.body.title;
    const description= req.body.description;
    const priority= req.body.priority;
    const emoji= req.body.emoji;


    const updateResult = await Task.updateOne({id:id},{
        $set: {
            title:title,
            description:description,
            priority:priority,
            emoji:emoji,
        }
    })

    // let index = -1 ;

    // tasks.map((task,i)=>{
    //     if(id===task.id)
    //     {
    //         index = i;

    //     }
    // })

    // tasks[index] ={
    //     id :id,
    //     title:title,
    //     description:description,
    //     priority:priority,
    //     emoji:emoji,
    // }

        res.json({
            'status':'success',
            'data':req.body.data,
        })
    
})



app.listen(PORT,()=>{
console.log('wow! server started ruunning port',PORT);
})