
function guestMiddleware(req, res, next) {
  if (req.session.user) {
    return res.redirect("/"); 
  }
  next();
}

function authMiddleware(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/users/login"); 
  }
  next();
}

module.exports = { guestMiddleware, authMiddleware };
