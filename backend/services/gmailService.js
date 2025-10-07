const { google } = require('googleapis');

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const getAuthUrl = () => {
  const scopes = [
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/gmail.send',
    'https://www.googleapis.com/auth/gmail.modify'
  ];
  return oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent'
  });
};

const getTokens = async (code) => {
  const { tokens } = await oAuth2Client.getToken(code);
  return tokens;
};

const getGmailClient = (token) => {
  const client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
  client.setCredentials(token);
  return google.gmail({ version: 'v1', auth: client });
};

const fetchEmails = async (token, maxResults = 10) => {
  const gmail = getGmailClient(token);
  const res = await gmail.users.messages.list({
    userId: 'me',
    maxResults,
    labelIds: ['INBOX']
  });
  if(!res.data.messages) return [];

  const messages = [];
  for (const msg of res.data.messages) {
    const detail = await gmail.users.messages.get({ userId: 'me', id: msg.id, format: 'full' });
    const payload = detail.data.payload;
    const headers = payload.headers;

    const from = headers.find(h => h.name === 'From')?.value || '';
    const to = headers.find(h => h.name === 'To')?.value || '';
    const subject = headers.find(h => h.name === 'Subject')?.value || '';
    let body = '';

    if (payload.parts && payload.parts.length) {
      const part = payload.parts.find(p => p.mimeType === 'text/plain');
      if (part?.body?.data) body = Buffer.from(part.body.data, 'base64').toString('utf8');
    } else if (payload.body?.data) {
      body = Buffer.from(payload.body.data, 'base64').toString('utf8');
    }

    messages.push({ from, to, subject, body });
  }
  return messages;
};

const sendEmail = async (token, to, subject, body) => {
  const gmail = getGmailClient(token);
  const message = [
    `To: ${to}`,
    'Content-Type: text/plain; charset=utf-8',
    `Subject: ${subject}`,
    '',
    body
  ].join('\n');

  const encodedMessage = Buffer.from(message).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');

  await gmail.users.messages.send({ userId: 'me', requestBody: { raw: encodedMessage } });
};

module.exports = { getAuthUrl, getTokens, fetchEmails, sendEmail };
