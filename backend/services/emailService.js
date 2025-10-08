// Placeholder/simulated functions for testing the AI flow.
async function fetchEmailsForUser(emailAccount) {
  // Simulated
  return [
    { id: 't1', from: 'alice@example.com', subject: 'Price for Widget A', body: 'Hi, what is the price of Widget A?' },
    { id: 't2', from: 'bob@example.com', subject: 'Order status', body: 'Hello, my order #1234 status?' }
  ];
}

async function sendEmailViaProvider(account, to, subject, body) {
  // Real implementation should call Gmail/Outlook send API.
  console.log('SEND-EMAIL (placeholder) =>', { to, subject, body });
  return { ok: true, providerResult: true };
}

module.exports = { fetchEmailsForUser, sendEmailViaProvider };
