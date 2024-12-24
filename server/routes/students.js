const express =require('express');
const router=express.Router();
const studentsController=require("../controllers/studentsController");

// router.get('/',(req,res)=>{
//     res.render('home')
// });

//view All record
router.get("/",studentsController.view);

//Add New Records
router.get("/adduser",studentsController.adduser);
router.post("/adduser",studentsController.save);

//Update Records
router.get("/edituser/:id",studentsController.edituser);
router.post("/edituser/:id",studentsController.edit);

//Delete Records
router.get("/deleteuser/:id",studentsController.delete);



module.exports=router;