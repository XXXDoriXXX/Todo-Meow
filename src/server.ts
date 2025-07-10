import express, {NextFunction} from 'express';
import type { Request, Response } from 'express';
import authRoutes from './routes/auth';
import todoRoutes from './routes/todo';
import { authenticate } from './middleware/auth';
import {getCurrentUser} from "./controllers/auth.controller";
//route -> controller -> service -> prisma
const app = express();
const PORT = 3000;
app.use(express.json());
app.get('/api', (req: Request, res: Response) => {
    return res.send('Meow Meow!');
})
app.use('/auth',authRoutes);
app.use('/todo',todoRoutes);
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));