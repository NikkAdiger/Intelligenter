import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cron from 'node-cron';

import schedulerService from './services/scheduler';
import checkRequest from './middleware/checkRequest';
import intellegerRouter from './routes/intellegerRouter';
import * as env from './config';

const app = express();
const { environment } = env;
const host = environment.webServer.host;
const port = environment.webServer.port;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors());

app.use(checkRequest);

// routes
app.use('/', intellegerRouter);

app.use('*', (req: Request, res: Response) => {
  res.status(200).send('Welcome to this API.');
});

if(environment.analysisAfterReboot) schedulerService();
cron.schedule('0 0 1 * *', schedulerService);

// example for test schedule once a minute
// cron.schedule('* * * * *', schedulerService);

app.listen(port, host, () => {
  return console.log(`server is listening on ${port}`);
});

export default app; 