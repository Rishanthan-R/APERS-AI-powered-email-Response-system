
const router = require('express').Router();
const multer = require('multer');
const Product = require('../models/Product');

const upload = multer();

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const csv = req.file.buffer.toString();
    const lines = csv.split('\n');

    for (let line of lines.slice(1)) {
      const [name, price, sku, desc] = line.split(',');
      if (!name) continue;
      await Product.create({
        user: req.user.id,
        name,
        price,
        sku,
        description: desc,
      });
    }

    res.send('Catalog saved');
  } catch (err) {
    res.status(500).send('Error uploading catalog');
  }
});

module.exports = router;
