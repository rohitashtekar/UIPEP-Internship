// mongodb+srv://rohitashtekar:<password>@cluster0.4wosp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./users');

//enter password
mongoose.connect('mongodb+srv://rohitashtekar:@cluster0.4wosp.mongodb.net/test?retryWrites=true&w=majority',
{
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then(() => {
    console.warn("DB Connected!");
});

User.find({}, (err, users) => {
    if(err) console.log(err);

    console.log(users);
});

// let data = new User({
//     // _id: new mongoose.Types.ObjectId,
//     name: "John",
//     email: "john@work.org",
//     age: 27,
//     country: "Cape Town",
//     continent : "Africa"
// });

// data.save()
// .then((result) => {
//     console.log(result);
//     console.log(`Success!`);
// })
// .catch((err) => {
//     console.log(err);
// });