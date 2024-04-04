const router = require('express').Router();
const {User} = require('../../models');

// router.post('./login',async (req,res)=>{
//     try {
//         const userData= await user.findOne({ where:{email: req.body.email}});
//         if(!userData) {
//             res
//             .status(400)
//         }
//     }

