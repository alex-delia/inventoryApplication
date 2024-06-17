#! /usr/bin/env node

console.log(
  'This script populates some test products, brands, and categories to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Product = require("./models/productSchema");
const Brand = require("./models/brandSchema");
const Category = require("./models/categorySchema");

const products = [];
const brands = [];
const categories = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createBrands();
  await createProducts();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function categoryCreate(index, name) {
  const category = new Category({ name: name });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function brandCreate(index, name, description) {
  const brand = new Brand({ name: name, description: description });
  await brand.save();
  brands[index] = brand;
  console.log(`Added brand: ${name}`);
}

async function productCreate(index, name, description, price, inStock, brand, category, sale) {
  const productdetail = {
    name: name,
    description: description,
    price: price,
    inStock: inStock,
    brand: brand,
  };
  if (category != false) productdetail.category = category;

  if (sale != false) {
    if (!sale.isOnSale) sale.salePercentage = 0;
    productdetail.sale = sale;
  }

  const product = new Product(productdetail);
  await product.save();
  products[index] = product;
  console.log(`Added Product: ${product}`);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate(0, "DJ Players"),
    categoryCreate(1, "DJ Controllers"),
    categoryCreate(2, "Mixers"),
    categoryCreate(3, "Headphones"),
    categoryCreate(4, "Speakers"),
  ]);
}

async function createBrands() {
  console.log("Adding brands");
  await Promise.all([
    brandCreate(
      0,
      "Pioneer",
      "Pioneer DJ is a leading innovator in DJ equipment and software, known for its high-quality controllers, mixers, turntables, and the popular rekordbox platform. Renowned for reliability and cutting-edge features, Pioneer DJ products are favored by top DJs and clubs worldwide. With a focus on innovation and user-friendly design, Pioneer DJ continues to shape the future of music performance and production."
    ),
    brandCreate(
      1,
      "RANE",
      "Rane DJ is a prominent manufacturer of professional DJ equipment, celebrated for its high-quality mixers, turntables, and controllers. Known for their robust build and superior audio performance, Rane DJ products are a favorite among DJs for both live performances and studio work. The company's commitment to innovation and reliability has solidified its reputation in the DJ community, making Rane DJ a trusted name in the industry."
    ),
    brandCreate(
      2,
      "Native Instruments",
      "Native Instruments is a leading provider of innovative software and hardware for music production and DJing. Renowned for its powerful tools like the KOMPLETE suite, MASCHINE groove production system, and TRAKTOR DJ software, Native Instruments empowers musicians, producers, and DJs to create and perform at the highest level. With a focus on cutting-edge technology and user-friendly design, Native Instruments has established itself as a cornerstone of the music industry."
    ),
  ]);
}

async function createProducts() {
  console.log("Adding Products");
  await Promise.all([
    productCreate(
      0,
      "CDJ-3000",
      "Enhance your creative power with our evolved flagship multi player, the CDJ-3000. This robust unit is powered by a new MPU and packed with specially developed high-quality components and innovative features.",
      2549,
      150,
      brands[0],
      [categories[0]],
      false
    ),
    productCreate(
      1,
      "RANE ONE",
      "The RANE ONE Motorized DJ controller takes the high-performance features, reliability and exceptional quality we're trusted for and without compromise, combines them into the ultimate Motorized DJ Controller.",
      1699,
      100,
      brands[1],
      [categories[1]],
      false
    ),
    productCreate(
      2,
      "TRAKTOR KONTROL Z1",
      "Ultra-compact 2-channel mixer, DJ controller, and soundcard for TRAKTOR DJ and TRAKTOR PRO 3.",
      239,
      250,
      brands[2],
      [categories[2]],
      { isOnSale: false }
    ),
  ]);
}
