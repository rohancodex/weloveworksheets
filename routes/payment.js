const express = require('express');
var router = express.Router();
const connectionRequest = require("../config/database");
const ejs = require('ejs');
router.use(express.static("public"));
var Razorpay = require("razorpay");
const { response } = require('express');
const crypto = require('crypto');
const isLoggedIn = require("./authorization.js");

router.get('/', async (req, res) => {
  res.render('pricing');
})

router.get('/pay?(:plan)', async (req, res) => {
  if (!req.session.loggedin) {
    res.redirect('/login');
    return;
  }
  else if (req.session.user[0].isActive == 1) {
    res.redirect('/dashboard');
    return;
  }
  else {
  
    let instance = new Razorpay(
      {
        key_id: process.env.RAZORPAY_ID,
        key_secret: process.env.RAZORPAY_SECRET
      }
    );
    if(req.query.plan ==="monthly"){
      var planId = "plan_ITlGcNeE8tvkN5"
      var plan = "monthly"
    }
    else if(req.query.plan ==="annual"){
      var planId = "plan_IXqbXJjIbXmdHr"
      var plan = "annual"
    }
    const response = await instance.subscriptions.create({
      plan_id: planId,
      customer_notify: 1,
      quantity: 1,
      total_count: 6
    }).catch(err => { console.log(err) })

    let sub_id = response.id;
    let id = req.session.user[0].id;
    let name = req.session.user[0].name;
    let email = req.session.user[0].email;

    mysqlConnection = connectionRequest();
    mysqlConnection.query('UPDATE teachers SET subscription_id= ? WHERE id = ?', [response.id, id], async (err, result) => {
      mysqlConnection.destroy();
      if (err) {
        console.error(err);
      }
      else {
        res.render('checkout', { sub_id: sub_id, name: name, email: email, plan:plan });
      }

    })
  }

})

router.post("/verification", async (req, res) => {
  let id = req.session.user[0].id;
  // console.log(req.query)
  mysqlConnection = connectionRequest();
  mysqlConnection.query('SELECT subscription_id from teachers where id = ?', [id], async (err, result) => {

    try {
      let sid = result[0].subscription_id;

      // const crypt = await crypto.createHmac('sha256', process.env.RAZORPAY_SECRET + | ) = await crypt.update(req.body.payment_id + '|' + id, )
      const crypt = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
        .update(req.query.payment_id + '|' + sid)
        .digest('hex')
      if (crypt === req.query.signature) {

        // mysqlConnection = connectionRequest();
        mysqlConnection.query('UPDATE teachers SET isActive = TRUE WHERE id = ?;', [id], async (err) => {
          mysqlConnection.destroy();
          if (err) {
            console.error(err);
          }
          else {
            req.session.user[0].isActive = 1;
            // console.log('success for ' + sid);
            res.sendStatus(200);
          }
        });

      } else {

        await res.sendstatus(400).send('Verification failed');
        console.log('request is not legit for payment_id ' + req.query.payment_id);
      }
    }
    catch {
      res.redirect('/pricing');
      console.error(err);
    }
  })
})

module.exports = router;