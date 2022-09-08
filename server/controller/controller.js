const Userdb = require('../model/model');


// Create New User ---------------------------->
exports.create=(req,res)=>{
    if(!req.body){
        res.status(400).send({ message : "Content Cannot be Empty !!"});
        return;
    }
    const user = new Userdb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status,
    })
    user
    .save()
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({ message : err.message || "Some Error Occured while creating User"});
    });
}


// Find One Or multiple Users ---------------------------->
exports.find=(req,res)=>{

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:`Cannot Find user with ${id}.Maybe user not found`});
            }else{
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message : err.message || "Some Error Occured while Finding User"});
        });

    }else{
        Userdb.find()
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.status(500).send({ message : err.message || "Some Error Occured while Finding User"});
        });
    }

}


// Update User ---------------------------->
exports.update=(req,res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({ message : "Content Cannot be Empty !!"});
    }
    
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id , req.body, {useFindAndModify: false})
    .then(data=>{
        if(!data){
            res.status(404).send({message:`Cannot Update user with ${id}.Maybe user not found`});
        }else{
            res.send(data);
        }
    })
    .catch(err => {
        res.status(500).send({ message : err.message || "Some Error Occured while Finding ID and Updating User"});
    });
}


// Delete User ---------------------------->
exports.delete=(req,res)=>{
    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message:`Cannot Delete user with ${id}.Maybe user not found`});
        }else{
            res.send({
                message:"User was Deleted Successfully !!"
            });
        }
    })
    .catch(err => {
        res.status(500).send({ message : err.message || "Some Error Occured while deleting User"});
    });
}