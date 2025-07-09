import express, {NextFunction} from 'express';
import type { Request, Response } from 'express';
import authRoutes from './routes/auth';
import { authenticate } from './middleware/auth';

const app = express();
const PORT = 3000;
app.use(express.json());
app.get('/api', (req: Request, res: Response) => {
    return res.send('Meow Meow!');
})
app.use('/auth',authRoutes);
app.get('/me', authenticate, (req: Request, res: Response) => {
    return res.send(`Hello, ${req.body.user.username}!`);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));