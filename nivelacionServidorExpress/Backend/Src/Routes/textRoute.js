import { Router } from 'express';
import { sendText, getText } from '../Controllers/textControllers.js';
export const textRouter = Router()

textRouter.post('/send', sendText );
textRouter.get('/textos', getText );

