const mongoose = require("mongoose");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");
const Campground = require("../models/campground"); // . will back out once

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  // useCreateIndex: true,		not require for newer version
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

// for camp titles ->  descriptors[] places[] -> Forest Village'
const sample = (array) => array[Math.floor(Math.random() * array.length)]; // produces random array index and pick one
const seedDB = async () => {
  await Campground.deleteMany({});
  // const camp = new Campground({title:'purple garden'});
  // await camp.save();
  // loop 50 times to produce 50 random camps by using cities[].city & cities[].state
  for (let i = 0; i < 400; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;

    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state} `,
      author: "614c18822f85c99e0b931591",
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus optio facilis nostrum suscipit sint, architecto quo sapiente officiis vitae obcaecati id nesciunt pariatur error cupiditate illum doloribus magni? Fuga, iusto.",
      images: {
        url: "https://res.cloudinary.com/dyprhck3q/image/upload/v1632305068/sample.jpg",
        filename: "YelpCamp/jspncanh3ye0yqoaxzcu",
      },
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  db.close();
});
