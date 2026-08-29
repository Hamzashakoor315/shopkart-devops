const express=require('express'); const cors=require('cors'); const products=require('./products.json');
const app=express(); const PORT=process.env.PORT||5000; const APP_NAME=process.env.APP_NAME||'ShopKart API'; const API_VERSION=process.env.API_VERSION||'v1'; const API_SECRET=process.env.API_SECRET||'';
app.use(cors()); app.use(express.json());
app.get('/health',(req,res)=>res.json({status:'ok',service:'backend'}));
app.get('/api/products',(req,res)=>res.json({success:true,count:products.length,products}));
app.get('/api/products/:id',(req,res)=>{const product=products.find(p=>p.id===Number(req.params.id)); if(!product)return res.status(404).json({success:false,message:'Product not found'}); res.json({success:true,product});});
app.get('/api/info',(req,res)=>res.json({application:APP_NAME,version:API_VERSION,secretConfigured:Boolean(API_SECRET)}));
app.listen(PORT,'0.0.0.0',()=>console.log(`${APP_NAME} listening on port ${PORT}`));
