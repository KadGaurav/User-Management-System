const { default: axios } = require("axios");

exports.homeRoutes = (req,res) => {

    axios.get('http://localhost:3000/api/users')
    .then(function(response){
        res.render('index',{users:response.data});
    })
    .catch(err => {
        res.status(500).send({ message : err.message || "Some Error Occured in Home routes"});
    });

}

exports.add_user = (req,res) => {
    res.render('add_user');
}

exports.update_user = (req,res) => {
    axios.get('http://localhost:3000/api/users',{params:{id:req.query.id}})
    .then(function(userdata){
        res.render('update_user',{user:userdata.data});
    })
    .catch(err => {
        res.status(500).send({ message : err.message || "Some Error Occured in Update routes"});
    });
}