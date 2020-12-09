const fetch = require("node-fetch");
exports.getAll = (req, res) => {
    // https://mylibbbybook.herokuapp.com//user/get

    let urls = [
        process.env.REST_URL + '/user/get',
    ];

    // map every url to the promise of the fetch
    let requests = urls.map(url => fetch(url));
    let users = [];
    Promise.all(requests).then(
        responses => {
            responses.forEach(
                response => {
                    response.json().then(data => {
                        var i = 1;
                        var Users=data.user;
                        Users.forEach(user=>{
                            users.push({
                                no:user._id,
                                rol:user.roll,
                                name:user.name,
                                lastname:user.lastname,
                                email:user.email,
                                phone:user.phone,
                                booksFine:user.booksFine,
                            });
                            i++;
                        })
                        console.log(users);
                        res.render('admin/allUsers', {admin:true,user:users})
                    })
                }
            )
        }
    )

}


exports.userProfile = (req, res) => {
    // https://mylibbbybook.herokuapp.com//user/get

    let urls = [
        process.env.REST_URL + '/orders/'+req.params.userid,
    ];

    // map every url to the promise of the fetch
    let requests = urls.map(url => fetch(url));
    let user = req.params.username;
    let books=[];
    Promise.all(requests).then(
        responses => {
            responses.forEach(
                response => {
                    response.json().then(data => {
                      var i=1;
                        var orders=data.orders;
                        orders.forEach(order=>{
                            date = new Date(order.book.addeddate);
                            newda = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                        console.log( order);
                           
                            books.push({
                                no:i,
                                status:order.status,
                                name: order.book.name,
                                price: order.book.price,
                                author: order.book.author,
                                cat: order.book.cat,
                                addeddate: newda,
                              
                            });
                           i++;
                        })
                        res.render('admin/profile', {admin:true,name:user ,books:books,userview:true})
                    })
                }
            )
        }
    )

}