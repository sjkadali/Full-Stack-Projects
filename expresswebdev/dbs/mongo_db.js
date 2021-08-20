const mongoose = require("mongoose");

( function mongoDBConnection() {
    const mongooseConnection = mongoose.createConnection('mongodb://localhost/my_database', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });

    mongoose.connect('mongodb://localhost/my_database', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });

    mongooseConnection.on('connected', () => {
        console.log('MongoDB connected.........');
    });
}());


//mongoDBConnection();