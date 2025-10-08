const express = require('express');
const router = express.Router();
const { classifyIntent, simpleSentiment } = require('../services/nlp');
const { findProductByName } = require('../services/productService');
const { renderTemplate, generateAIResponseFallback } = require('../services/responseService');


router.post('/generate', async (req, res) => {
  try {
    const { emailText, userId, customerName } = req.body;
    const intent = classifyIntent(emailText);
    const sentiment = simpleSentiment(emailText);
    const product = await findProductByName(emailText, userId);
    let suggested = '';

    if (intent === 'Price Request' && product) {
      suggested = renderTemplate(intent, { name: customerName || 'Customer', product: product.name, price: product.price });
    } else if (intent === 'Order Status') {
      const orderMatch = emailText.match(/#?(\d{3,10})/);
      suggested = renderTemplate(intent, { name: customerName || 'Customer', orderId: orderMatch ? orderMatch[1] : 'UNKNOWN' });
    } else if (intent === 'Support Request') {
      suggested = renderTemplate(intent, { name: customerName || 'Customer' });
    } else {
      // fallback to OpenAI
      try {
        suggested = await generateAIResponseFallback(emailText, { intent, sentiment, product: product?.name });
      } catch (e) {
        suggested = renderTemplate('General Inquiry', { name: customerName || 'Customer' });
      }
    }

    res.json({ ok: true, intent, sentiment, product, suggested });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
