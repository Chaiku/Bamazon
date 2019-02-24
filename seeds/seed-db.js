//write out sequelize code//
const db = require('../models');
const items = [
  {
    product_name: "Hammer",
    department_name: "Hardware",
    price: 13,
    stock_quantity: 50
    }, 
  {
    product_name: "Gretsch Black Nickel Snare",
    department_name: "Music",
    price: 200,
    stock_quantity: 10
    }, 
  {
    product_name: "Boxing Gloves",
    department_name: "Sports",
    price: 100,
    stock_quantity: 50
    }, 
  {
    product_name: "Rock em Sock em Boppers",
    department_name: "Entertainment",
    price: 75.00,
    stock_quantity: 40
    }, 
  {
    product_name: "Dynamite Sticks",
    department_name: "Demolition",
    price: 100,
    stock_quantity: 100
    }, 
  {
    product_name: "Old Batman comics",
    department_name: "Entertainment",
    price: 50.00,
    stock_quantity: 80
    }, 
  {
    product_name: "Knuckle Sandwich",
    department_name: "Beatdown",
    price: 0,
    stock_quantity: 5000
    }, 
  {
    product_name: "Acme Do It Yourself Road-Runner Catching Kit",
    department_name: "Hunting",
    price: 500,
    stock_quantity: 25
    }, 
  {
    product_name: "Ticking Time Bomb",
    department_name: "Tools/Mass Destruction",
    price: 1000,
    stock_quantity: 40
    }, 
  {
    product_name: "Flinstones BamBam Plushie",
    department_name: "Toys",
    price: 19.95,
    stock_quantity: 50
    }
  ];
  db.sequelize.sync({force: true}).then(function() {
    db.Product.bulkCreate(items).then(function(rows) {
      console.log('\n\nINSERTED\n\n');
      db.sequelize.close();

    }).catch(function(err) {
      console.log('\n\nError:', err);
    });
  });