const mysql2 = require("mysql2");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");



const database = mysql2.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE // Use the DATABASE environment variable for the database name
});


exports.register = (req, res) => {
    
    //console out the request of the form
    
    console.log(req.body);
    

    const { name, email, password, passwordConfirm } = req.body;

    database.query('SELECT email FROM users WHERE email = ?',  [email], async (error, results) => {

        if (error) {
            
            console.log(error);
        }
        if (results.length > 0) {
            return res.render("register", {
                message: "That email is already in use"
            })
        } else if (password !== passwordConfirm) {
            return res.render("register", {
                message: "Passwords do not match"
            });
        
        }
        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        res.send("testing")
    });




    
    

    
  
          
}

   
