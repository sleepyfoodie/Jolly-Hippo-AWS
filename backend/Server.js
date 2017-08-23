const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const User = require('./models/users');
const Request = require('./models/requests');

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
    console.log('req body' , req.body)
    User.find({email:req.body.email})
        .then(object => {
            if (object[0].password === req.body.password) {
                res.json(object[0]);
                console.log("matching!")
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
                console.log("email exist already")
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

    

//postal code clean up
const postal = "v6p 5l7";
const code = postal.split("");
console.log(code);
let index
for (let i = 0; i < code.length; i++) {
    if (code[i] == " ") {
        index = i
        console.log("i is now " + index)
        code.splice(index, 1)
    };
};
console.log(code);
// still test mode
// let newCode
// function upperCase() {
//     var newCode = code.toUpperCase()
//     console.logl(newCode, " is working");
// }
// upperCase();


//GET REQUEST for populating profile page
app.get('/users/:email', (req, res) => {
    console.log('req body' , req.body)
    User.find({email:req.params.email})
        .then(object => {
            console.log(object)
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



// GET (ALL) REQUEST
// app.get('/cars', (req,res) => {
// 	Car.find({})
// 		.then(objectsArray => {
// 			res.json(objectsArray);
// 		})
// 		.catch(err => {
// 			console.log(err);
// 			res.status(400)
// 				.json({err});
// 		})
// });




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

//UPDATE(PUT) REQUEST
// app.put('/dealerships/:objectId', (req,res) => {
//     let object = req.body;
// 	let query = {"_id":req.params.objectId}

// 	Dealership.findOneAndUpdate(query, req.body, { runValidators:true })
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

//DELETE REQUEST
// app.delete('/dealerships/:objectId', (req,res) =>{
//     let object = req.body;
// 	Dealership.findOneAndRemove({"_id":req.params.objectId})
// 		.then(object => {
// 			res.json({deleted:true});
// 		})
// 		.catch(err => {
// 			console.log(err);
// 			res.status(400)
// 				.json({err});
// 		})
// });

app.get("*", (req,res) => {
    res.sendFile(path.resolve(__dirname+"./../frontend/build/index.html"))
})

app.listen(8080, () => {
    console.log('SERVER RUNNING ON 8080');
})


