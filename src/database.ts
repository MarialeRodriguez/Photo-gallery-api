import mongoose  from 'mongoose';

//const mongoose = require('mongoose');

export async function startConnection() {
    await mongoose.connect('mongodb://localhost/photo-gallery-db', {
        // useNewUrlParser: true,
        // usefindAndModify: false
    });
    console.log('Connected to MongoDB');
}

