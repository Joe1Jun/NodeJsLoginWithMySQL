const express = require("express");
const path = require("path");
const mysql2 = require("mysql2");
const dotenv = require("dotenv");

dotenv.config({
    path: './.env'

});

const app = express();


const database = mysql2.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE // Use the DATABASE environment variable for the database name
});


const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory));


//parse url encoded bodies as sent by HTML forms
app.use(express.urlencoded({ extended: false }));
//Parse JSON bodies as sent by API clients

app.use(express.json());

app.set('view engine', 'hbs');


database.connect((error) =>{

    if (error) {
        console.log(error);
    } else {
        console.log("MYSQL Connected....")
    }
}
)
//define routes

app.use('/', require("./routes/pages"));
app.use("/auth", require("./routes/auth"));



app.listen(5000, () => {

    console.log("Server started on Port 5000");
})


