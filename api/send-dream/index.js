const sendgrid = require('@sendgrid/mail');

const recipient = 'info@kinderfoor.be';

function response(status, body) {
  return {
    status,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };
}

module.exports = async function (context, req) {
  const { childName, dream, parentName, parentEmail } = req.body || {};

  if (!childName || !dream || !parentName || !parentEmail) {
    context.res = response(400, { error: 'Vul alle verplichte velden in.' });
    return;
  }

  if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_FROM_EMAIL) {
    context.log.error('SENDGRID_API_KEY or SENDGRID_FROM_EMAIL is not configured.');
    context.res = response(500, { error: 'De e-maildienst is momenteel niet beschikbaar.' });
    return;
  }

  sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

  try {
    await sendgrid.send({
      to: recipient,
      from: process.env.SENDGRID_FROM_EMAIL,
      replyTo: parentEmail,
      subject: `Mijn Kinderfoor-droom voor 2028 - ${childName}`,
      text: [
        'Hallo Kinderfoor,',
        '',
        'Graag deel ik mijn Kinderfoor-droom voor de 25ste editie in 2028.',
        '',
        `Voornaam kind: ${childName}`,
        'Mijn Kinderfoor-droom:',
        dream,
        '',
        `Naam ouder / begeleider: ${parentName}`,
        `E-mailadres ouder / begeleider: ${parentEmail}`,
        '',
        'Ik geef toestemming om dit idee te gebruiken als inspiratie voor de organisatie van Kinderfoor 2028.',
        '',
        'Groetjes'
      ].join('\n')
    });

    context.res = response(202, { message: 'Je droom werd doorgestuurd.' });
  } catch (error) {
    context.log.error(error);
    context.res = response(502, { error: 'De droom kon niet worden doorgestuurd.' });
  }
};