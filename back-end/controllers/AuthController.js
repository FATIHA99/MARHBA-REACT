// !this file contain the
// TODO  sign in and signup function
// TODO  function confirmation for the email adresse 
// TODO  function forget password to  send the verification to the email 
// TODO function reset password to update password  after the email sended 
// TODO fuctions to render pages
// TODO function to logout

const model = require('../models/AuthModel.js')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const jwt = require('jsonwebtoken');
const ls = require('local-storage')
const verf = require('../tools/nodemailer/email_verif')
const password_verification = require('../tools/nodemailer/forgetPassword')
const HandleError = require('../tools/ErrorHandling');
const ErrorHandling = require('../tools/ErrorHandling');


function signUp(req, res) {
    const { body } = req;
    ls('email', req.body.email)
    const hashPassword = bcrypt.hashSync(body.password, 10)
    User.findOne({ email: body.email })
        .then((e) => {
            if (e) { res.json({ message: 'email already exist' }) }
            else {
                body.password = hashPassword;
                User.create({ ...body })
                    .then(() => {
                        verf._nodemailer()
                        res.json({ message: 'created successfully ! verify your email' })
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        })
        .catch()
}




const signIn = (req, res) => {
    const { body } = req
    const pass = body.password

    User.findOne({ email: body.email }).then((e) => {
        if (e) {
            const data = e
            console.log(data)
            const hashPassword = bcrypt.compareSync(pass, e.password)
            if (!hashPassword) {
                res.json({ message: 'password wrong' })
            }
            else {

                if (e.confirmation) {
                    const token = jwt.sign({ data }, process.env.SECRETWORD)
                    ls('token', token);
                    res.json({

                     message: 'success' ,
                     info:data
                    })

                }
                else {
                    res.json({ message: 'confirm the email to access to your account  !!!!!' })
                }

            }

        } else {

            if (!body.email || !body.password) {
                res.json({ message: 'fill field !!' })
            }
            else {
                res.json({ message: 'user not found' })
            }
        }

    })

}




const confirmation = (req, res) => {
    const { token } = req.params;
    const tkn = jwt.verify(token, process.env.SECRETWORD)
    req.data = tkn
    User.findOneAndUpdate({ email: req.data.email }, { confirmation: true })
        .then(()=>{
            // res.json({message:'confirmation success .'})
            res.redirect('http://localhost:3000/api/auth/login')
        })
}


const forgetPassword = (req, res) => {
  
    const { body } = req
    const email = body.email;
    User.findOne({ email: email })
        .then((user) => {
            if (!user) { res.json({message:'user not found with this email'}) }
            else {
                ls('mailToken', email)
                password_verification.forgetpassword()
                res.json({message: 'visit email'})
            }
        })
}


const resetPassword = (req, res) => {
    const { mailToken } = req.params
    const verifToken = jwt.verify(mailToken, process.env.SECRETWORD)
    if(!verifToken){console.log('token wrong ')}
    req.mail = verifToken.mail;
    const pass = req.body.password;
    const passHash = bcrypt.hashSync(pass, 10)
    User.findOneAndUpdate({ email: req.mail }, { password: passHash })
        .then((e) => {
            // res.json({message: 'your password updated successfully '})
            res.redirect('http://localhost:3000/api/auth/login')
            res.redire

        })
        .catch(error => {
            res.send(error)
        })
}




const Client = (req, res) => { res.json({message:'Client Page '}) }
const Livreur = (req, res) => { res.json({message:'Livreur Page'}) }

const logout = (req, res) => {
    ls.clear()
    res.json({message:'local storage is clear now '})
}
module.exports = { signUp, signIn, confirmation, forgetPassword, resetPassword,  Client, Livreur, logout }