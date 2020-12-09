var express = require('express');
var router = express.Router();
const fetch = require("node-fetch");

/* GET home page. */
router.get('/home', function (req, res, next) {
  let urls = [
    process.env.REST_URL+'/books/',
  ];

  // map every url to the promise of the fetch
  let requests = urls.map(url => fetch(url));
  let books = [];
  // Promise.all waits until all jobs are resolved
  Promise.all(requests)
    .then(responses => {
      responses.forEach(
        response => {
          console.log(`${response.url}:${response.status}`)
          response.json().then(data => {
            var i = 1;
            data.books.forEach(d => {
             
              date = new Date(d.addeddate);
              newda = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();//prints expected format.
              var boItem = {
                no:i,
                name: d.name,
                price: d.price,
                author: d.author,
                cat: d.cat,
                avilable: d.avilable,
                takenby: d.takenby,
                addeddate: newda
              }
              i=i+1;
              books.push(boItem)
             
            })
            // console.log(books[0]);
            res.render('admin/viewboks', { books, admin: true,});
          })

        }
      )

    }
    );

});
router.get('/', function (req, res, next) {
  res.render('admin/login', {  appbar:true });
});
module.exports = router;
