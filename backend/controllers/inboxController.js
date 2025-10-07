const Email = require('../models/Email');
const { fetchEmails, sendEmail } = require('../services/gmailService');
const { generateReply } = require('../services/aiService');

exports.fetchInbox = async (req, res) => {
  try {
    if(!req.user.gmailToken) return res.status(400).json({ message:'Gmail not connected' });

    const gmailEmails = await fetchEmails(req.user.gmailToken, 20);

    for(const gEmail of gmailEmails){
      const exists = await Email.findOne({
        user: req.user._id,
        from: gEmail.from,
        subject: gEmail.subject,
        body: gEmail.body
      });
      if(!exists){
        const email = new Email({ user: req.user._id, ...gEmail });
        await email.save();
      }
    }

    const emails = await Email.find({ user: req.user._id }).sort({ date:-1 });
    res.json(emails);

  } catch(err){
    console.error(err);
    res.status(500).json({ message:'Failed to fetch inbox' });
  }
};

exports.replyEmail = async (req, res) => {
  try {
    const email = await Email.findById(req.params.emailId);
    if(!email) return res.status(404).json({ message:'Email not found' });
    if(!req.user.gmailToken) return res.status(400).json({ message:'Gmail not connected' });

    const replyText = await generateReply(email.body);
    email.aiReply = replyText;
    await email.save();

    await sendEmail(req.user.gmailToken, email.from, `Re: ${email.subject}`, replyText);
    res.json({ email, message:'Reply sent successfully!' });

  } catch(err){
    console.error(err);
    res.status(500).json({ message:'Failed to send AI reply' });
  }
};
