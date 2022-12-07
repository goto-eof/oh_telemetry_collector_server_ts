import express, { Application } from 'express';
import { DataSource } from 'typeorm';
import { getConfig } from './configuration/datasource.config';
import routes from './routes';

const port = process.env.SERVER_PORT;

declare global {
  namespace Express {
    interface Request {
      dataSource: DataSource;
    }
  }
}

const start = async () => {
  const app: Application = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  let dataSource = await initializeDataSource();
  app.use(async function (req, res, next) {
    req.dataSource = dataSource;
    next();
  });
  app.use('/', routes);

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

async function initializeDataSource() {
  let connection = await new DataSource(getConfig()).initialize();

  (async () => {
    await connection.runMigrations({
      transaction: 'all',
    });
  })();

  return connection;
}

start();
