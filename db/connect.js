const mongoose = require('mongoose');

const connectionString = process.env.MONGO_URI;

const connectDB = (url) => {
    return mongoose
        .connect(url, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });
}

module.exports = connectDB;
// .then((result) => console.log('Connected to the database successfully.'))
//     .catch((err) => console.log(err));

