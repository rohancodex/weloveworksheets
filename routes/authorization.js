module.exports = async function isLoggedIn(req, res, next) {

        if(!req.session.loggedin){
            
            res.redirect('/login');
            return;
        }
        if (!req.session.user[0].isActive || req.session.user[0].isActive!==1) {
            
          await res.redirect('/pricing');
        // res.send(401, "Unauthorized");
          return;
        } else {
            // console.log("authorised")
            next();
        }    
  };