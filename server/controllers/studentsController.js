const mysql =require('mysql');

const con=mysql.createPool({
    connectionLimit:10,
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
})


exports.view=(req,res)=>{
    //Check Database Connection and view coded
    con.getConnection((err,connection)=>{
        if(err) throw err
        connection.query("select * from users",(err,rows)=>{
            connection.release();
            if(!err){
                // console.log("Good");
                res.render("home",{rows});
            }
            else{
                console.log("Error in Listing Data "+err);
            }
        });
    });
};

// addUser get method
exports.adduser=(req,res)=>{
    res.render('adduser');
}


// addUser post method
exports.save=(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err
        const{name,age,city}=req.body

        connection.query("Insert Into users (NAME,AGE,CITY) values(?,?,?)",[name,age,city],(err,rows)=>{
            connection.release();
            if(!err){
                res.render('adduser',{msg:"User Details Added Success"});
            }
            else{
                console.log("Error in Listing Data "+err);
            }
        });
    });
};

//Edituser get method
exports.edituser=(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err
        //Get ID from url
        const id=req.params.id;

        connection.query("select * from users where id=?",[id],(err,rows)=>{
            connection.release();
            if(!err){
                // console.log("Good");
                res.render("edituser",{rows});
            }
            else{
                console.log("Error in Listing Data "+err);
            }
        } );

    });
};


// Edit post method
exports.edit = (req, res) => {
    con.getConnection((err, connection) => {
        if (err) throw err;
        const { name, age, city } = req.body;
        const id = req.params.id;

        connection.query(
            "UPDATE users SET NAME=?, AGE=?, CITY=? WHERE ID=?",
            [name, age, city, id],
            (err, rows) => {
                connection.release();
                if (!err) {

                    con.getConnection((err,connection)=>{
                        if(err) throw err
                        //Get ID from url
                        const id=req.params.id;
                
                        connection.query("select * from users where id=?",[id],(err,rows)=>{
                            connection.release();
                            if(!err){
                                // console.log("Good");
                                res.render('edituser', {rows, msg: "User Details Updated Successfully" });
                            }
                            else{
                                console.log("Error in Listing Data "+err);
                            }
                        } );
                
                    });    
                } else {
                    console.log("Error in Updating Data " + err);
                }
            }
        );
    });
};


//Delete use page
exports.delete = (req, res) => {
    con.getConnection((err, connection) => {
        if (err) {
            console.error("Database connection error: ", err);
            return res.status(500).send("Database connection failed.");
        }

        // Get ID from the URL
        const id = req.params.id;

        connection.query("DELETE FROM users WHERE id = ?", [id], (err, rows) => {
            connection.release(); // Release the connection back to the pool

            if (!err) {
                res.redirect('/');
            } else {
                console.error("Error deleting user: ", err);
                res.status(500).send("Failed to delete user.");
            }
        });
    });
};

