module.exports = function isLoggedIn(req, res, next) {

        if(!req.session.loggedin){
            console.log("not logged in")
            res.redirect('/login');
            return;
        }
        if (!req.session.user[0].isActive || req.session.user[0].isActive!==1) {
            console.log("paise");
          res.redirect('/pricing/pay');
        // res.send(401, "Unauthorized");
          return;
        } else {
            console.log("authorised")
            next();
        }    
  };