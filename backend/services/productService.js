const Product = require('../models/Product');

// Find a product by keyword in name
async function findProductByName(query, userId) {
  return await Product.findOne({
    user: userId,
    name: new RegExp(query, 'i'),
  });
}

module.exports = { findProductByName };
