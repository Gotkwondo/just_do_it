import express from 'express';
import cors from 'cors';
import api from './api/index.js';

const app = express();
const port = 4000;

//  라우터 설정
const router = express.Router();
router.use('/api', api);  //  api 라우트 적용

app.use(express.json());
app.get('/', (req, res) => {
  res.send('hello');
  console.log('hello');
})

app.use(cors());
app.listen(port, () => {
  console.log(`listening on 4000`);
});
