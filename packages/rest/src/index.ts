import express from 'express';
import sequelize, { VoiceEvent } from '@time-tracker/database';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.get('/events', async (req, res) => {
  const events = await VoiceEvent.findAll({ include: { all: true } });
  res.json(events);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  sequelize.sync();
});
