import express from "express";
const app = express();

import {main} from "./util/sendMail.js"

//Point app to client/dist folder
import path from "path";
app.use(express.static(path.resolve("../client/dist")))
app.use(express.json());

import helmet from "helmet";
app.use(helmet());


import cors from "cors";
app.use(cors({ credentials: true, origin: true }));

//Pass form data 
app.use(express.urlencoded({extended: true}))

import db from "./database/connection_mysql.js";
import bcrypt from "bcrypt";

import session from "express-session";
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        maxAge: 100 * 60 * 60
        
    }
}));

import rateLimit from "express-rate-limit";

const saltRounds = 12;

const loginLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 6, // Limit each IP to 6 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
//app.use("/login", loginLimiter);

app.get("/api/logout", (req,res) => {
    console.log("here")
    res.clearCookie("connect.sid");
    req.session.destroy();
    res.send({});
});

app.get("/api/session", (req,res) => {
    res.send(req.session)
});

app.get("/api/users", async (req, res) =>{
    
    if(req.session.role === "admin"){
    const result = await db.execute(`SELECT username, role FROM users;`)
    res.send({data: result[0]})
    }
    else{
        res.send({message: "something went wrong"})
    }
});



app.post("/login", loginLimiter, async (req, res) => {
    console.log(req.sessionID)
    const email = req.body.email;
    const password = req.body.password;
    const result = await db.execute(`SELECT * FROM users where email='${email}';`)
    console.log(result[0])
    
    
    
    if(result[0].length === 1){
        let userNameFromDb = result[0][0].username;
        let passwordFromDb = result[0][0].password;
        let emailFromDb = result[0][0].email;
        let roleFromDb = result[0][0].role;
        const encryptedPassword = await bcrypt.compare(password, passwordFromDb);
        if (encryptedPassword === true) {
            console.log(req.session)
            req.session.loggedIn = true;
            req.session.role = roleFromDb;
            
            req.session.user = {
                username: userNameFromDb,
                email: emailFromDb,
                role: roleFromDb
            }
           // req.session.cookie.name = "ieei"
            console.log(req.session)
            console.log("user found and validated")
            res.send(req.session)

        }
        else{
            res.send({message: "Something went wrong - Try again"})
        }
        
    }
    else{
        res.send({message: "Something went wrong - Try again"})
    }
    
});

app.post("/signup", async (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const result = await db.execute(`SELECT * FROM users where email='${email}' OR username='${username}';`)
    console.log("Start")
    console.log(result)
    console.log("End")
    if(result[0].length != 0){
        res.send({
            error: "Signup failed - Username or email already exists in my system"
    })
    }
    if(result[0].length === 0){ 
    let activationCode = Math.floor(Math.random() * 1000000).toString();
    console.log(activationCode)
    main(username, email, activationCode)
    const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);  
    db.execute(`INSERT INTO users (username, password, email, role) VALUES ('${req.body.username}', '${encryptedPassword}', '${req.body.email}', 'user');`);
 
    res.send({
        message: "Nice u joined us bossman: ",
        username: username,
        email: email

})
    }
    
});

const PORT = 8080 || process.env.PORT;
app.listen(PORT, () => { 
    console.log("Server is running on port", PORT)
});