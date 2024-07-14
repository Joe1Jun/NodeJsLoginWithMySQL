const mysql2 = require("mysql2");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");



const database = mysql2.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE // Use the DATABASE environment variable for the database name
});

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).render("login", {
                message: "Please provide an email and password"
            })
        }

        database.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
            console.log(results);
            if (!results || !(await bcrypt.compare(password, results[0].password))){
                res.status(401).render("login", {
                    message: "Email or Password is incorrect"
                })
            } else {
                const id = results[0].id;

                const token = jwt.sign({id: id}, process.env.JWT_SECRET)
            }
        })
        
    } catch (error) {
        console.log(error);
    }

}


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

        database.query('INSERT INTO users SET ?', { name: name, email: email, password: hashedPassword }, (error, results) => {

            if (error) {
                console.log(error);
            }
            else{
                return res.render("register", {
                    message: "User registered"
                });
            }
        })
        
    });

    




    
    

    
  
          
}

   
