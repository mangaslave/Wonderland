import { Hono } from 'hono';
import { config } from 'dotenv';
import routes from './route';

config(); 

const app = new Hono();

app.route('/api', routes);

console.log("server is running");

