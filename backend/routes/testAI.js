
const router = require('express').Router();
const { classifyIntent, analyzeSentiment } = require('../services/nlp');
const { findProductByName } = require('../services/productService');

router.post('/ai-test', async (req, res) => {
  const { text, userId } = req.body;
  const intent = classifyIntent(text);
  const sentiment = await analyzeSentiment(text);
  const product = await findProductByName(text, userId);

  res.json({
    intent,
    sentiment,
    matchedProduct: product ? product.name : 'None found',
  });
});