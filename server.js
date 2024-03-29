const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
//routes
app.get('/',(req, res) => {
    res.send(' hello node api')
})

app.get('/blog',(req, res) => {
    res.send(' hello blog how are you')
}) 


app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.get('/products/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.post('/products', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})


//update product
app.put('/products/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body);

        //product is not in database
    
        if(!product){
            return res.status(404).json({message: 'product not found id ${id}'})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//delete

app.delete('/products/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product= await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: 'product not found id ${id}'})
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.set("strictQuery", false)

mongoose.connect('mongodb+srv://rambhasahu57908:rSG8SvZLk44qyos7@cluster0.rslnd97.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() =>{
    console.log('connected to Mongoose')
    app.listen(3000, ()=> {
        console.log('node API app is running on port 3000')
    });
}).catch((error) => {
    console.log('error')
})