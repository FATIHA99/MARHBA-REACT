const jwt = require('jsonwebtoken')
const ls = require('local-storage')



function verificationRole(access) {
  return (req, res, next) => {
    if (ls('token')) {  //!  login
      const t = ls('token');
      const token = jwt.verify(t, process.env.SECRETWORD)
      if (token) {
        req.data = token;
        if (access.includes(req.data.data.role)) { next() }
        else { res.json({ message: 'no user have this role ' }) }
      }
      else { res.json({ message: 'token not valid' }) }
    }
    else { res.json({ message: 'token not found ' }) }
  }
}




module.exports = { verificationRole }