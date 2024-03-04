const express = require('express');
const cors = require('cors');
const formData = require('form-data');
const Mailgun = require('mailgun.js');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Configuration de Mailgun
const mailgun = new Mailgun(formData);
const client = mailgun.client({
	username: 'Orlandini Sebastien',
	key: process.env.MAILGUN_API_KEY,
});

app.post('/form', async (req, res) => {
	try {
		const { firstname, lastname, email, message } = req.body;

		//  Create object
		const messageData = {
			from: `${firstname} ${lastname} <${email}>`,
			to: 'sebastien.orlandini@gmail.com',
			subject: `Formulaire JS`,
			text: message,
		};

		console.log('messageDATA >>>', messageData);

		// Send info to Mailgun to create email et send this
		const response = await client.messages.create(
			process.env.DOMAINE,
			messageData
		);

		console.log('response>>>', response);
		res.status(200).json(response);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

app.all('*', (req, res) => {
	res.status(404).json({ message: '😞 Not found 😞' });
});

app.listen(process.env.PORT || 3000, (req, res) => {
	console.log('🚀🚀 Server has started 🚀🚀');
});
