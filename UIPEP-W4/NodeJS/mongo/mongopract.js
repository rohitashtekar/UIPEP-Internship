const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser: true, useUnifiedTopology: true}, (error) => {
    if(error) {
        console.log(error);
    }
    else {
        console.log('DB Connected');
    }
});