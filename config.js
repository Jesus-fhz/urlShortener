//SETTING DB CONNECTION
//ENV VARIABLES CONFIG
require('dotenv').config();
//MONK FOR MONGODB()
const monk = require('monk');
//Connect
const urlConnection = process.env.MONGODB_URI || '127.0.0.1:27017/dbUrls';
const dbConnection =  monk(urlConnection);
//Creaete Collection
const urls = dbConnection.get('urlsCollection');
//Create Index
urls.createIndex({idUrl:1},{ unique: true });
module.exports = urls;