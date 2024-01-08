import {join,dirname} from "path";
import { fileURLToPath } from "url";
import body from "body-parser";
import mysql from "mysql2";
import express from "express"


const app=express();
app.use(body.urlencoded({ extended: true }));
const dname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(join(dname, 'public')));
app.use(express.json());
const port=3000;
let check=false;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'portfolio_contact',
    password: 'Amit8698@',
    database: 'portfolio_contact'
});


db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});


app.get('/',(req,res)=>{
    res.sendFile(dname+"/public/portfolio.html")
})

app.get('/skills',(req,res)=>{
    res.sendFile(dname+'/public/skills.html');
})

app.get('/projects',(req,res)=>{
    res.sendFile(dname+'/public/projects.html');
})
app.get('/contact',(req,res)=>{
    res.render('contact.ejs',{data:"Submitted!",check:check});
    check=false;
})


app.post('/submit', (req, res) => {
    console.log(req.body["name"]);
    const { name, email, message } = req.body;
    const sql = 'INSERT INTO data (name, email, message) VALUES (?, ?, ?)';
    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log('Data inserted successfully');
            check=true;
            res.redirect('/contact');

        }
    });
});

app.listen(3000,()=>{
    console.log(`Running at${port} `);
})
