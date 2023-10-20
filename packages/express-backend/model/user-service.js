import mongoose from "mongoose";
import userModel from "./user.js";

mongoose.set("debug", true);

mongoose.connect(
    "mongodb://127.0.0.1:27017/users", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
}).catch((error)=>console.log(error));

function getUsers(name, job){
    let promise;
    if (name === undefined && job === undefined){
        promise = userModel.find();
    } else if (name && !job){
        promise = findUserByName(name);
    } else if (!name && job){
        promise = findUserByJob(job);
    }
    return promise;
}

function addUser(user){
    const userToAdd = new userModel(user);
    return userToAdd.save();
}

function findUserById(id){
    return userModel.findById(id);
}

function findUserByName(name){
    return userModel.find({name: name});
}

function findUserByJob(job){
    return userModel.find({job:job});
}

function deleteUserById(idToDelete){
    userModel.deleteOne({id: idToDelete})
    return true;
}

export default {
    addUser,
    getUsers,
    findUserById,
    findUserByName,
    findUserByJob,
    deleteUserById,
};