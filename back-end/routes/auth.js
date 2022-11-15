const router = require("express").Router()
const {signUp,signIn,confirmation,forgetPassword,resetPassword,Client,Livreur, logout} = require('../controllers/AuthController.js')
const verif = require('../tools/verificationRole')
const emv = require('../tools/nodemailer/email_verif')

router.post('/auth/login',signIn);
router.post('/auth/register',signUp);
router.get('/auth/confirm/:token',confirmation); 
router.post('/auth/forgotPassword',forgetPassword) 
router.post('/auth/resetPassword/:mailToken',resetPassword)

router.get('/auth/client', verif.verificationRole(['client']),Client)
router.get('/auth/livreur', verif.verificationRole(['livreur']),Livreur)
router.get('/auth/admin', verif.verificationRole(['admin']),(req,res)=>{


    res.json({message:'admin'})

})
router.get('/auth/logout',logout)







module.exports = router