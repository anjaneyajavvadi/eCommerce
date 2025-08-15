import express from 'express'
import { addToCart, getUserCart,updateCart, removeFromCart } from '../controllers/cartController.js'
import userAuth from '../middleware/userAuth.js'

const cartRouter = express.Router();

cartRouter.post('/add',userAuth,addToCart);
cartRouter.get('/list',userAuth,getUserCart);
cartRouter.put('/update',userAuth,updateCart);
cartRouter.delete('/remove',userAuth,removeFromCart);

export default cartRouter;