const express = require('express');
require('dotenv').config()
const app = express();
app.use(express.json())

const PORT = process.env.PORT ||5000;


// temp database 
let tasks = []


// Create a task 
app.post('/tasks',(req,res) =>{
     const task ={
         'id': req.body.id,
        'title': req.body.title,
         'description': req.body.description,
        'priority': req.body.priority,
         'emoji': req.body.emoji
     }

     tasks.push(task)

     res.json({
         'status':'success',
         'message':'task added successfully',
         'data':task
     })
    })

// to read all task
app.get('/tasks',(req,res)=>{
 res.json({
    'status':'success',
    'data':tasks
   }) 
})

// read specific task 

app.post('/get_task',(req,res)=>{
    const id = req.body.id;

    let resultTask;
    tasks.map((task)=>{
        if(task.id === id) {
         resultTask = task;
        }
    })
    res.json({
        'status':'sucess',
        'data':resultTask,
    })
})

// delete all Task

app.post('/delete_task',(req,res)=>{
     tasks = []

    res.json({
        'status': 'success',
        'data': tasks
    })
})

// Delete specific task by id 

app.post('/delete_task',(req,res)=>{
    const id = req.body.id;

    let index = -1;
    tasks.map((task)=>{
        if(id===task.id)
        {
            index = i;
        }
    })

     tasks.splice(index,1)

    res.json({
        'status':'success',
        'data':tasks
    })
})
// Update 
app.post('/update_task',(req,res)=>{

    const id = req.body.id;
    const title= req.body.title;
    const description= req.body.description;
    const priority= req.body.priority;
    const emoji= req.body.emoji;

     let index = -1 ;

     tasks.map((task,i)=>{
        if(id===task.id)
         {
          index = i;

        }
     })

     tasks[index] ={
         id :id,
        title:title,
        description:description,
       priority:priority,
        emoji:emoji,
     }

        res.json({
            'status':'success',
            'data':req.body.data,
        })
    
})


app.listen(PORT,()=>{
console.log('wow! server started ruunning port',PORT);
})