
// --- Basic Sentiment + Intent Classification ---

const { SentimentAnalyzer } = require('node-nlp');
const analyzer = new SentimentAnalyzer({ language: 'en' });

// Analyze sentiment (positive / negative / neutral)
async function analyzeSentiment(text) {
  const result = await analyzer.getSentiment(text);
  return result.vote; // returns 'positive', 'negative', or 'neutral'
}

// Simple rule-based intent classification
function classifyIntent(text) {
  const lower = text.toLowerCase();
  if (lower.includes('price') || lower.includes('cost'))
    return 'Price Request';
  if (lower.includes('order') || lower.includes('status'))
    return 'Order Status';
  if (lower.includes('help') || lower.includes('issue'))
    return 'Support Request';
  return 'General Inquiry';
}

module.exports = { analyzeSentiment, classifyIntent };
