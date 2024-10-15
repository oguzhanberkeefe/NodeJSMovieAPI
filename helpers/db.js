const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb+srv://berke04efe2004:YQeOYwgKZ25SbGAn@berke.iksgt.mongodb.net/?retryWrites=true&w=majority&appName=berke', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 20000 // 20 saniye

    });

    mongoose.connection.on('open', () => {
        console.log('Connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
        console.log('Connected to MongoDB', err);
    });

    mongoose.Promise = global.Promise;
}