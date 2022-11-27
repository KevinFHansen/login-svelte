import mysql from "mysql2/promise";

//For at kunne bruge promises til mysql skal der importeres en promise wrapper
//database skal være created. 
const connection = await mysql.createConnection({
    host: "localhost",
    user: "",
    password: "",
    database: "",
});

export default connection;