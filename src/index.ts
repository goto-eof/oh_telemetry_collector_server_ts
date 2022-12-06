import express, { Application } from 'express';
import { DataSource } from 'typeorm';
import { getConfig } from './configuration/datasource.config';
import routes from './routes';

const port = 8019;

const start = () => {
  const app: Application = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/', routes);

  initializeDatabase();
  initializeServer(app);
};

function initializeServer(app: Application) {
  try {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error: any) {
    console.log(`Error occurred: ${error.message}`);
  }
}

async function initializeDatabase() {
  let connection = await new DataSource(getConfig()).initialize();

  (async () => {
    await connection.runMigrations({
      transaction: 'all',
    });
  })();
}

start();
