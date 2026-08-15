import bodyParser from 'body-parser';
import express from 'express';

import eventRoutes from './routes/events.js';

const app = express();

app.use(bodyParser.json());
app.use(eventRoutes);

// Export the app so test suites can import it without starting a server
export default app;