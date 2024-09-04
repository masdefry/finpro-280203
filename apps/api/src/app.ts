import express, { json, urlencoded, Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { PORT } from './config';
import authRouter from './routers/auth.router'; // Import authRouter

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  // Konfigurasi middleware dasar
  private configure(): void {
    this.app.use(cors()); // Mengaktifkan CORS
    this.app.use(json()); // Parsing JSON body
    this.app.use(urlencoded({ extended: true })); // Parsing URL-encoded body
  }

  // Menangani error di routing
  private handleError(): void {
    // Handle 404 Not Found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        res.status(404).json({ message: 'API route not found!' });
      } else {
        next();
      }
    });

    // Handle error 500
    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        console.error('Error: ', err.stack);
        res.status(500).json({ message: 'Internal Server Error!' });
      } else {
        next();
      }
    });
  }

  // Definisi semua routes
  private routes(): void {
    // Menambahkan auth router
    this.app.use('/api/auth', authRouter); 

    // Default route
    this.app.get('/api', (req: Request, res: Response) => {
      res.send('Hello, API is working!');
    });
  }

  // Mulai server
  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
