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
const sendEmail = require('./emailService');  // Adjust the path if necessary

require('dotenv').config();
const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'asdfghjkl';


// middleware setup
app.use(express.json()); 
app.use(cookieParser());
app.use('/uploads',express.static(__dirname+'/uploads'));

app.use(cors({
    credentials:true,
    origin:'http://localhost:5173',
}));

// Update the URI to point to your local MongoDB instance
const uri = 'mongodb://localhost:27017/mydatabase';

// database connection
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
  const { name, email, password, role } = req.body; 
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt), // hashed version of a password for secure storage
      role: role || 'user', // Default to 'user' if not provided
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});



// Search API
app.get('/search' , async (req, res) => {
  try {
      const query = req.query.query;
      if (!query) {
          return res.status(400).json({ message: "Query is required" });
      }

      const places = await Place.find({
          $or: [
              { category: { $regex: query, $options: "i" } },
              { address: { $regex: query, $options: "i" } },
          ],
      }).select("_id title address category"); // Select only necessary fields

      res.json({places});
  } catch (error) {
      res.status(500).json({ message: "Error fetching users", error});
    }
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
      const isPasswordCorrect = bcrypt.compareSync(password, userDoc.password);
      if (isPasswordCorrect) {
        // payload,secret key,expiration time,callback
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

// fetch profile 
app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  if (token) {
    // token verify
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        return res.status(401).json('Invalid or expired token');
      }
      // Attempt to find the user by ID
      const user = await User.findById(userData._id);  
      if (!user) {
        return res.status(404).json('User not found');
      }
      // If user is found, send back user data
      const { name, email,role, _id} = user;
      res.json({ name, email,role, _id });
    });
  } else {
    res.status(401).json('No token provided');
  }
});

// edit profile
app.put('/profile', async (req, res) => {
  const { token } = req.cookies;
  const { name, email} = req.body;

  if (!token) {
    return res.status(401).json('No token provided');
  }

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) {
      return res.status(401).json('Invalid or expired token');
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        userData._id,
        { name, email },
        { new: true }
      );

      res.json({
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      });
    } catch (error) {
      res.status(500).json('Error updating profile');
    }
  });
});


app.post('/logout', (req,res) => {
  res.cookie('token', '').json(true);
});


// admin page

app.get('/admin/places', async (req, res) => {
  try {
    const places = await Place.find(); // Retrieve all places
    res.status(200).json(places);
  } catch (error) {
    console.error('Error fetching places:', error);
    res.status(500).json({ message: 'Failed to fetch places' });
  }
});
app.get('/admin/users', async (req, res) => {
  try {
    const users = await User.find(); // Retrieve all users
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});
app.get("/admin/bookings/count", async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments(); // Assuming 'Booking' is your model
    res.json({ totalBookings });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookings count" });
  }
});

// delete user
app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the user
    await User.findByIdAndDelete(id);

    // Optionally, you can add logic to clean up user-related data if needed
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Failed to delete user' });
  }
});




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


// posting new places
app.post('/places', (req,res) => {
  const {token} = req.cookies;
  const {
    title,address,addedPhotos,description,price,
    facility,extraInfo,checkIn,checkOut,maxGuests,category,
  } = req.body;

  // console.log('received category:',category);

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner:userData._id,price,
      title,address,photos:addedPhotos,description,
      facility,extraInfo,checkIn,checkOut,maxGuests,category,
    });
    res.json(placeDoc); //sends the place’s data (placeDoc) as a JSON response to the client.
  });
});

// Get user-specific places
app.get('/user-places',(req,res) => {
  const {token} = req.cookies;
  jwt.verify(token, jwtSecret, {},async (err, userData) => {
    const userId = userData._id;  
    res.json(await Place.find({ owner: userId }));
  })
});

// Get a specific place by ID
app.get('/places/:id',async(req,res) => {
  const {id} = req.params;
  res.json(await Place.findById(id));
})

// posting a review
app.post('/places/:id/reviews', async (req, res) => {
  const { id } = req.params;
  console.log('Review API Request Body:', req.body); 
  const { userId, username, comment, rating } = req.body;

  try {
      const place = await Place.findById(id);
      console.log('Review Data:', { userId, username, comment, rating });
      if (!place) {
          return res.status(404).json({ message: 'Place not found' });
      }

      const newReview = { userId, username:username || "anonymous", comment, rating };
      place.reviews.push(newReview);
      await place.save();

      res.status(201).json({ message: 'Review added successfully', reviews: place.reviews });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to add review' });
  }
});


// update places
app.put('/places', async (req, res) => {
  const { token } = req.cookies;
  const {
    id, title, address, addedPhotos,
    description, facility, extraInfo,
    checkIn, checkOut, maxGuests, price,category,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) return res.status(401).json({ error: 'Unauthorized' });

    const placeDoc = await Place.findById(id);

    // Compare ObjectIds to verify ownership
    if (userData._id.toString() === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photos: addedPhotos,
        description,
        facility,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
        category,
      });

      await placeDoc.save();
      res.json('ok');
    } else {
      res.status(403).json({ error: 'Forbidden: You are not the owner of this place' });
    }
  });
});

// delete places
app.delete('/places/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Place.findByIdAndDelete(id);
    res.status(200).json({ message: 'Place deleted successfully' });
  } catch (error) {
    console.error('Error deleting place:', error);
    res.status(500).json({ message: 'Failed to delete place' });
  }
});


// Get all places
app.get('/places',async(req,res) => {
  res.json(await Place.find());
});


// booking create
app.post('/account/bookings', async (req, res) => {
  const { checkIn, checkOut, numberofGuests, name, phone, place, price } = req.body;
  const mytoken=req.cookies.token
  console.log("token",mytoken)

  // Assume req.user contains the user ID (typically from authentication middleware)
  const user = await jwt.verify(mytoken,jwtSecret)
  
  if (!user) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  try {
    const booking = await Booking.create({
      place,
      user:user._id,
      checkIn,
      checkOut,
      numberOfGuests: numberofGuests,
      name,
      phone,
      price,
    });
    // console.log(booking);
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json(err);
  }
});


app.get('/bookings', async (req, res) => {
  try {
    const userData = await getUserDataFromReq(req);

    // Fetch bookings with populated 'place' and 'user' details
    const bookings = await Booking.find({ user: userData._id })
      .populate('place') // Populate 'place' details
      .populate('user', 'email name'); // Populate 'user' details with only 'email' and 'name'

    console.log(bookings); // Log the data being sent
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});



// Route to send an email
app.post("/send-email", async (req, res) => {
  const { to, subject, text, html } = req.body;

  try {
    // Call sendEmail function with the email details
    await sendEmail(to, subject, text, html);
    res.status(200).send("Email sent successfully!");
  } catch (error) {
    res.status(500).send("Failed to send email");
  }
});

app.listen(4000 ,() => {
    console.log("http://localhost:4000");
});

