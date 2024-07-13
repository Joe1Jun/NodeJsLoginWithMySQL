
const mysql2 = require("mysql2");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

const database = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "nodejs-login"// Use the DATABASE environment variable for the database name
});


database.connect((error) =>{

    if (error) {
        console.log(error);
    } else {
        console.log("MYSQL Connected....")
    }
}
)



exports.register = (req, res) => {
    
    //console out the request of the form
    console.log(req.body);
    const { name, email, password, passwordConfirm } = req.body;

    database.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.error("Error executing database query:", error);
            return res.status(500).send("An error occurred while processing your request.");
        }
        if (results.length > 0) {
            
            return res.render('register', {

                message: 'That email is already in use'
            })
        } else if (password !== passwordConfirm) {
            return res.render('register', {

                message: 'Passwords do not match'
            })

        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        //first one is name of database the second is the name from the form
        
        database.query('INSERT INTO users SET ?', { name: name, email: email, password: hashedPassword, }, (error, results) => {
            
            if (error) {
                console.log(error);

            } else {
                console.log(results);
                return res.render('register', {
                    
                    message: 'User registered'
                })
           }

        })
    })
          
}

   
