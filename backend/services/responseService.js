
const { OpenAI } = require("openai");
const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

const templates = {
  'Price Request': 'Hello {{name}}, the price of {{product}} is ${{price}}. Let me know if you want to place an order.',
  'Order Status': 'Hello {{name}}, we are checking the status of order {{orderId}} and will update you soon.',
  'Support Request': 'Hello {{name}}, thanks for reaching out. Our support team will contact you shortly.',
  'General Inquiry': 'Hello {{name}}, thanks for contacting us. We will respond shortly.'
};

function renderTemplate(intent, params = {}) {
  let tpl = templates[intent] || templates['General Inquiry'];
  Object.keys(params).forEach(k => {
    tpl = tpl.split(`{{${k}}}`).join(params[k] ?? '');
  });
  // remove leftover placeholders
  return tpl.replace(/\{\{[^}]+\}\}/g, '').trim();
}

async function generateAIResponseFallback(emailText, context = {}) {
  if (!openai) throw new Error('OPENAI_API_KEY not set for fallback');
  const prompt = `You are a helpful assistant. Context: ${JSON.stringify(context)}\n\nUser email:\n"""${emailText}"""\n\nWrite a short (1-3 sentence) professional reply.`;
  const res = await openai.chat.completions.create({
    model,
    messages: [{ role: "user", content: prompt }],
    temperature: 0.6,
    max_tokens: 200
  });
  return res.choices?.[0]?.message?.content?.trim() || '';
}

module.exports = { templates, renderTemplate, generateAIResponseFallback };
