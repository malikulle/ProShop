const dotenv = require("dotenv");
const users = require("./data/users");
const products = require("./data/products");
const Product = require("./models/Product");
const User = require("./models/User")
const Order = require("./models/Order");

const connectDatabse = require("./config/db");

dotenv.config();
connectDatabse();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

const destoryData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destoyed!!");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

if (process.argv0[2] === "-d") {
  destoryData();
} else {
  importData();
}
