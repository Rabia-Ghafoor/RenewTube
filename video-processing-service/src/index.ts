import express from 'express';
import ffmpeg from "fluent-ffmpeg"; 

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World! This is Rabia');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
