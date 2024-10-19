const mongoose = require('mongoose');

const DatabaseConnection = () => {
    try {
        mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true, 
            useUnifiedTopology: true}).then(() => {
            console.log('Connected to MongoDB')
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = DatabaseConnection;


