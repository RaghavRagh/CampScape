const mongoose = require('mongoose');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            // author: '6417261b0d1ed265c5af80d0',
            author: '64889e69f0fb19adfb12989e',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "The campsite is nestled in a picturesque natural setting, surrounded by towering trees and expansive greenery. A gentle stream flows nearby, providing the soothing sound of running water and a perfect spot for fishing or cooling off on a hot summer day.",
            price,
            geometry: { 
                type: 'Point', 
                coordinates: [ 
                    cities[random1000].longitude, 
                    cities[random1000].latitude 
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dmbx6jaji/image/upload/v1680160113/YelpCamp/wjy2ev6atmjup6jrv2v9.jpg',
                    filename: 'YelpCamp/pqsegjzdgtqpqrfcd8ml',
                },
                {
                    url: 'https://res.cloudinary.com/dmbx6jaji/image/upload/v1679732039/YelpCamp/gplffynlrsek6uh5wzri.jpg',
                    filename: 'YelpCamp/vvuxmsue8r7tc2uyzhoq',
                },
                {
                    url: 'https://res.cloudinary.com/dmbx6jaji/image/upload/v1679731997/YelpCamp/hrkckzhz1xz5rs72mhvm.jpg',
                    filename: 'YelpCamp/cmikbpsnxrh0wdt0yuod',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    console.log("DB connection close");
    mongoose.connection.close();
})