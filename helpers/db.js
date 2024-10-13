const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb+srv://berke04efe2004:YQeOYwgKZ25SbGAn@berke.iksgt.mongodb.net/?retryWrites=true&w=majority&appName=berke');

    mongoose.connection.on('open', () => {
        console.log('Connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
        console.log('Connected to MongoDB', err);
    });

    mongoose.Promise = global.Promise;
}