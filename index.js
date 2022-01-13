const express = require('express');
const app = express()
const pool = require("./db")

app.use(express.json())


//CREATE STOCKS
app.post("/stocks", async(req, res)=>{
    console.log("aaaaaaaaaa");
    try{

        const {data} = req.body;
        const newTodo = await pool.query(
            "INSERT INTO stock (data) VALUES ($1) RETURNING *",
            [data]
        );
        res.json(newTodo.rows[0])

    }catch (err){
        console.log(err.message);
    }

})

//GET ALL STOCKS
app.get("/stocks", async (req,res) => {
    console.log("wwwwwwwwer");
    try{
        const allStocks = await pool.query("SELECT * FROM stock")
        res.json(allStocks.rows)

    }catch(err){
        console.log(err.message);
    }
})

//GET A STOCKS
app.get("/stocks/:id", async (req, res)=>{
    const code = req.params.id;
    console.log(code);
    try {
        const stock = await pool.query(
            "SELECT * FROM stock WHERE code = $1", [code]
        )
        res.json(stock.rows[0])

    }catch(err){
        console.log(err.message);
    }
})

//UPDATE A STOCKS
app.put("/stocks/:id", async (req, res)=>{
    try{
        const code = req.params.id;
        console.log(code);
        const data = req.body;
        console.log("rrrrrrrrrr");
        console.log(data);
        const updateStock = await pool.query(
            "UPDATE stock SET data = $1 WHERE code =$2", 
            [data, code ]
        )
        res.json("Stock was updated")
    }catch(err){
        console.log(err.message);
    }
})

//DELETE A STOCKS
app.delete("/todos/:id", async(req, res)=>{
    try{
        const {id} = req.params;
        const deleteTodo = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1",[id]
        )
        res.json("Todo was successfully deleted"); 
    }catch(err){
        console.log(err.message);
    }
})

app.listen(3000, ()=>{
    console.log("server running on port 3000");
})