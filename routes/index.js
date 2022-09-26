var express = require('express');
var router = express.Router();
var mysql = require ('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'yashvi'
});
connection.connect(function(err){
  if(!err){
    console.log("Database Connected");
  }else{
    console.log("Database Not Connected")
  }
});

router.get('/pp', function(req, res, next) {
  res.render('pp', { title: 'Express' });
});

router.post('/pp', function(req, res, next) {
  var a = req.body.txt1;
  var b = req.body.txt2;
  var c = req.body.txt3;
  var d = req.body.txt4;

  connection.query("insert into tbl_product (product_name,product_price,product_quality,product_offer) value(?,?,?,?)",[a,b,c,d],function(err,result){
    res.send('record added')
  });
});

router.get('/display', function(req, res, next) {
  connection.query("select * from tbl_product",function(err,db_rows){
    if (err) throw err;
    console.log(db_rows);
    res.render('display',{db_rows_array:db_rows});
  })


});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.get('/product-details', function(req, res, next) {
  res.render('index');
});

router.get('/about', function(req, res, next) {
  res.render('about');
});

router.get('/blog', function(req, res, next) {
  res.render('blog');
});

router.get('/blog-details', function(req, res, next) {
  res.render('blog-details');
});

router.get('/Login', function(req, res, next) {
  res.render('Login');
});

router.post('/Login', function(req, res, next) {
  var a = req.session.mysess2;
  var b = req.body.email11;
  
   if(a&&b)
   {
     console.log('same')
     res.redirect('/home')
   }else{
     console.log('not')
     //res.redirect('/signup')
   }
   
 
 });
 


router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.post('/signup', function(req, res, next) {
  var my1 = req.body.username;
  console.log(my1);
  var my2 = req.body.email;
  console.log(my2);
  var my3 = req.body.password;
  console.log(my3);
  var my4 = req.body.mobileno;
  console.log(my4);

  req.session.mysess1=my1;
  console.log("session value is"+req.session.mysess1);
  req.session.mysess2=my2;
  console.log("session value is"+req.session.mysess2);
  req.session.mysess3=my3;
  console.log("session value is"+req.session.mysess3);
  req.session.mysess4=my4;
  console.log("session value is"+req.session.mysess4);

  var fileobject = req.files.file123;
  var filename = req.files.file123.name;
  var filesize = req.files.file123.size;
  var filemimetype = req.files.file123.mimetype;
  
  fileobject.mv("public/upload/"+filename,function(err){
    if(err)
    return res.status(500).send(err)
    ///res.send('file uploaded!')
    //res.redirect("/login")
  })
  res.redirect("/Login")
});


router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Express' });

});


router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err){
    res.redirect('/Login')
  })
});




router.get('/cart', function(req, res, next) {
  res.render('index');
});

router.get('/checkout', function(req, res, next) {
  res.render('checkout');
});

router.get('/contact', function(req, res, next) {
  res.render('contact');
});

router.get('/shop', function(req, res, next) {
  res.render('producr-details');
});

router.get('/wishlist', function(req, res, next) {
  res.render('wishlist');
});
module.exports = router;
