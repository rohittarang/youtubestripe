// constant 

const cors = require("cors")
const express = require("express")
// TODO : add a stripe key
// const stripe = require("stripe")("#type secretkey here")
const uuid = require("uuid")
const app = express()

// middlewear

app.use(express.json())
app.use(cors())

//routes
app.get("/", (req, res) => {
    res.send("IT WORKS AT LEARNCODEONLINE")
})

app.post("/payment", (req, res) => {
    const {product, token} = req.body;
    console.log("PRODUCT", product);
    console.log("PRICE", product.price);
    const idempontencyKey = uuid()

    return stripe.customers.create({
        email : token.email,
        source : token.id
    }).then(customer => {
        stripe.charges.create({
            amount : product.price*100,
            currency : 'usd',
            customer : customer.id,
            receipt_email : token.email,
            description : `purchase of ${product.name}`,
            shipping : {
                name : token.card.name,
                address : { country : token.card.address_country }
            }
        }, {idempontencyKey});
    }).then( result => res.status(200).json(result))
    .catch(err => console.log(err))

})

//listen
app.listen(8282, () => console.log("Listening at PORT 8282"))
