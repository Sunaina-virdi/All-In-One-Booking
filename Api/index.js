const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User.js');
const Place = require('./models/Place.js');
const Booking = require('./models/Booking.js');
const cookieParser = require("cookie-parser");
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');

require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'asdfghjkl';

app.use(express.json()); 
app.use(cookieParser());
app.use('/uploads',express.static(__dirname+'/uploads'));

app.use(cors({
    credentials:true,
    origin:'http://localhost:5173',
}));

// Update the URI to point to your local MongoDB instance
const uri = 'mongodb://localhost:27017/mydatabase';

mongoose.connect(uri, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
}).then(() => {
   console.log('Connected to local MongoDB');
}).catch((error) => {
   console.error('Error connecting to local MongoDB:', error);
});

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

app.get('/test',(req,res) => {
    res.json('test ok');
});

app.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body; // Accept role
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
      role: role || 'user', // Default to 'user' if not provided
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
      const isPasswordCorrect = bcrypt.compareSync(password, userDoc.password);
      if (isPasswordCorrect) {
        jwt.sign({email:userDoc.email,_id:userDoc._id,name:userDoc.name},jwtSecret,{},(err,token) => {
            if(err) throw err;
            res.cookie('token',token).json(userDoc)
        });
      } else {
          res.status(401).json('Invalid password');
      }
  } else {
      res.status(404).json('User not found');
  }
});
app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        return res.status(401).json('Invalid or expired token');
      }

      // Attempt to find the user by ID
      const user = await User.findById(userData._id);  // Use userData._id, not userData.id
      if (!user) {
        return res.status(404).json('User not found');
      }

      // If user is found, send back user data
      const { name, email,role, _id } = user;
      res.json({ name, email,role, _id });
    });
  } else {
    res.status(401).json('No token provided');
  }
});

app.post('/logout',(req,res) => {
  res.cookie('token','').json(true);
});

// app.get('/profile',(req,res) => {
//   const {token} = req.cookies;
//   if(token){
//     jwt.verify(token, jwtSecret, {},async (err, userData) => {
//       if(err) throw err;
//       const {name,email,_id} = await User.findById(userData.id);
//       res.json({name,email,_id});
//     });
//   }else{
//     res.json(null);
//   }
// });

// console.log({__dirname});
app.post('/upload-by-link',async(req,res) => {
  const {link} = req.body;
  const newName = 'photo' + Date.now() + '.jpg';
  await imageDownloader.image({
    url: link,
    dest: __dirname + '/uploads/' + newName,
  });
  res.json(newName);
})

const photosMiddleware = multer({dest:'uploads/'});
app.post('/upload',photosMiddleware.array('photos',100),(req,res) => {
  const uploadedFiles = [];
  for(let i = 0;i < req.files.length; i++){
    const {path,originalname} = req.files[i];
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' +ext;
    fs.renameSync(path,newPath);
    uploadedFiles.push(newPath.replace('uploads\\',''));
  }
  res.json(uploadedFiles);
});
// const upload = multer({ dest: "uploads/" });

// app.post("/upload", upload.array("photos", 10), (req, res) => {
//   const uploadedFiles = [];
//   req.files.forEach((file) => {
//     const newPath = file.path + "." + file.mimetype.split("/")[1];
//     fs.renameSync(file.path, newPath); // Rename the file to include its extension
//     uploadedFiles.push(newPath.split("/")[1]); // Save only the filename
//   });
//   res.json(uploadedFiles); // Respond with an array of filenames
// });

// posting new places
app.post('/places',(req,res) => {
  const {token} = req.cookies;
  const {title,address,addedPhotos,description,
    facility,extraInfo,checkIn,checkOut,maxGuests,price,
  } = req.body;
  jwt.verify(token, jwtSecret, {},async (err, userData) => {
    if(err) throw err;
    const placeDoc = await Place.create({
      owner:userData.id,
      title,address,photos:addedPhotos,description,
      facility,extraInfo,checkIn,checkOut,maxGuests,
    })
  });
  res.json(placeDoc);
});

app.get('/user-places',(req,res) => {
  const {token} = req.cookies;
  jwt.verify(token, jwtSecret, {},async (err, userData) => {
    const {id} = userData;
    res.json(await Place.find({owner:id})); 
  })
});

app.get('/places/:id',async(req,res) => {
  const {id} = req.params;
  res.json(await Place.findById(id));
})

// update places
app.put('/places',async(req,res) => {
  const {token} = req.cookies;
  const {
    id, title, address, addedPhotos,
    description, facility, extraInfo,
    checkIn, checkOut, maxGuests,price,
  } = req.body;

  jwt.verify(token, jwtSecret, {},async (err, userData) => {
    const placeDoc = await Place.findById(id);
    if(userData.id === placeDoc.owner){
      placeDoc.set({
        title,address,photos:addedPhotos,description,
        facility,extraInfo,checkIn,checkOut,maxGuests,price,
      });
      placeDoc.save();
      res.json('ok');
    }
  });
});

app.get('/places',async(req,res) => {
  res.json(await Place.find());
});

// booking create
// app.post('/bookings', async (req, res) => {
//   // const userData = await getUserDataFromReq(req);
//   const {
//     place,checkIn,checkOut,numberOfGuests,name,phone,price,
//   } = req.body;
//   Booking.create({
//     place,checkIn,checkOut,numberOfGuests,name,phone,price,
//     // user:userData.id,
//   }).then((doc) => {
//     res.json(doc);
//   }).catch((err) => {
//     throw err;
//   });
// });

app.post('/bookings', async (req, res) => {
  const { checkIn, checkOut, numberofGuests, name, phone, place, price } = req.body;

  // Assume `req.user` contains the user ID (typically from authentication middleware)
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  try {
    const booking = await Booking.create({
      place,
      // user:user._id,
      checkIn,
      checkOut,
      numberOfGuests: numberofGuests,
      name,
      phone,
      price,
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json(err);
  }
});


// app.get('/bookings', async (req,res) => {
//   const userData = await getUserDataFromReq(req);
//   res.json( await Booking.find({user:userData.id}).populate('place') );
// });

app.listen(4000 ,() => {
    console.log("http://localhost:4000");
});
