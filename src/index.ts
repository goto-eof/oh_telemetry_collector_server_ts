import express, { Application } from 'express';
import { DataSource } from 'typeorm';
import { getConfig } from './configuration/datasource.config';
import routes from './routes';
import cluster from 'node:cluster';
import { cpus } from 'node:os';
import process from 'node:process';

const port = process.env.SERVER_PORT;

declare global {
  namespace Express {
    interface Request {
      dataSource: DataSource;
    }
  }
}

const startWorker = async () => {
  console.log(`Worker ${process.pid} started`);
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

function startMaster() {
  const numCPUs = cpus().length;
  console.log(`Primary ${process.pid} is running`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
}

if (cluster.isPrimary) {
  startMaster();
} else {
  startWorker();
}
