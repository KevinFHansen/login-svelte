import db from "./connection_mysql.js";
import bcrypt from "bcrypt";

const encryptedPassword = await bcrypt.hash("admin", 12);

const isInDeleteMode = true;

if (isInDeleteMode) {
    db.execute(`
        DROP TABLE IF EXISTS users;
    `);
}

db.execute(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255),
    password VARCHAR(255),
    email VARCHAR(255),
    role TEXT
);
`);

// seed the database
if (isInDeleteMode) {
    db.execute(`INSERT INTO users (username, password, email, role) VALUES ('admin', '${encryptedPassword}', 'admin@admin.dk', 'admin');`);
}

db.end();
