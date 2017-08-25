const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const User = require('./models/users');
const Request = require('./models/requests');

//for deploy
const path = require('path');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost/data/db/');
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected to db at /data/db/")
});

//middleware for express server to set up folder to serve static files (for access to all bundle.js and images)
app.use(express.static(path.resolve(__dirname + "./../frontend/build")))



//CREATE NEW REQUESTS
app.post('/requests',(req,res) => {
	let object = req.body;
    let newRequest = new Request(object);

	newRequest.save()
		.then(savedObject => {
            res.json(savedObject);
            { requestSaved: true }
		})
		.catch(err => {
			console.log(err);
			res.status(400).json({err})
		})
});

//POST REQUEST SIGN IN PAGE
app.post('/users', (req, res) => {
    User.find({email:req.body.email})
        .then(object => {
            if (object[0].password === req.body.password) {
                res.json(object[0]);
            }
            else {
                res.send({ match: false });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400)
                .json({ err });
        })
});

//POST REQUEST SIGN UP
app.post('/users/signup', (req,res) => {
    let newUser = new User(req.body);
    User.find({email:req.body.email})
        .then(object => {
            if (object.length !== 0) {
                res.send({userExist: true});
            }
            else {
                newUser.save()
                    .then(savedObject => {
                        res.json(savedObject);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(400).json({err})
                    })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400)
                .json({ err});
        })
})

//
const postal = "v6p 5l7";
const code = postal.split("");
let index
for (let i = 0; i < code.length; i++) {
    if (code[i] == " ") {
        index = i
        code.splice(index, 1)
    };
};
function upperCase(param) {
    var newCode = param.toUpperCase()
    return newCode
}
console.log(upperCase(code));



//GET REQUEST for populating profile page
app.get('/users/:email', (req, res) => {
    User.find({email:req.params.email})
        .then(object => {
                res.json(object);
        })
        .catch(err => {
            console.log(err);
            res.status(400)
                .json({ err });
        })
});


// GET (ALL) REQUEST
app.get('/requests', (req, res) => {
    Request.find({})
        .then(objectsArray => {
            res.json(objectsArray);
        })
        .catch(err => {
            console.log(err);
            res.status(400)
                .json({ err });
        })
});


//UPDATE(PUT) REQUEST
// app.put('/cars/:objectId', (req,res) => {
//     let object = req.body;
//     console.log("put route was hit")
// 	let query = {"_id":req.params.objectId}

// 	Car.findOneAndUpdate(query, req.body, { runValidators:true })
// 		.then(updatedObject => {
// 			res.json(updatedObject);
// 		})
// 		.catch(err => {
// 			console.log(err)
// 			res.status(400).json({err});
// 		})
// });


//DELETE REQUEST
// app.delete('/cars/:objectId', (req,res) =>{
//     let object = req.body;
//     console.log("delete route working")

// 	Car.findOneAndRemove({"_id":req.params.objectId})
// 		.then(object => {
// 			res.json({deleted:true});
// 		})
// 		.catch(err => {
// 			console.log(err);
// 			res.status(400)
// 				.json({err});
// 		})
// });


//also for deploy
app.get("*", (req,res) => {
    res.sendFile(path.resolve(__dirname+"./../frontend/build/index.html"))
})

app.listen(process.env.PORT || 8080, () => {
    console.log('SERVER RUNNING ON 8080');
})


