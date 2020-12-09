const controllers = require('./controller/users')
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {

  res.render('admin/view-products', { admin: true, product })
});
router.get('/add-book', (req, res) => {
  res.render('admin/add-book')
})

router.get('/add-user', (req, res) => {
  res.render('admin/add-user')
})
router.post('/add-product', (req, res) => {
  console.log(req.body);
})

router.get('/allusers', controllers.getAll)
router.get("/user/:username/:userid", controllers.userProfile);
module.exports = router;
