const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require('mongoose');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-yuvasree:65HariYuvi74@cluster0.zabaa.mongodb.net/spiceStoreDB",{useNewUrlParser:true});

//mongooseschema

const vendorSchema = new mongoose.Schema({
    vendorName: String,
    vendorMail: String,
    price: Number
    
  });
  
  
  
//model
const Vendor = mongoose.model("Vendor",vendorSchema);

//mongooseschema
const spiceSchema = new mongoose.Schema({
    name: String,
    vendors: [vendorSchema]
    
  });

  //model 
const Spice = mongoose.model("Spice",spiceSchema);

const spice1 = new Spice({
    name: "Onion"
})
const spice2 = new Spice({
    name: "Garlic"
})
const spice3 = new Spice({
    name: "Ginger"
})
const spice4 = new Spice({
    name: "Green Chilli"
})
const spice5 = new Spice({
    name: "Black pepper"
})
const spice6 = new Spice({
    name: "Chilli powder"
})
const spice7 = new Spice({
    name: "Cinnamon bark"
})
const spice8 = new Spice({
    name: "Clove"
})
const spice9 = new Spice({
    name: "Cardamom"
})
const spice10 = new Spice({
    name: "Cumin seeds"
})
const defaultSpices = [spice1,spice2,spice3,spice4,spice5,spice6,spice7,spice8,spice9,spice10];

// Spice.insertMany(defaultSpices,function(err){
//     if(err)
//     {
//         console.log(err);
//     }
//     else
//     {
//         console.log("Successfully inserted");
//     }
// })

app.get("/", function(req, res){
    Spice.find(function(err,spices){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("storePage",{spiceItems : spices});

        }
    })

   
});
  
app.get("/addVendor", function(req, res){
    res.render("addUser");
});

app.get("/login", function(req, res){
    res.render("login");
});
app.get("/addSpice", function(req, res){
    res.render("addSpice");
});

app.post("/addVendor", function(req, res){
    const Vname = req.body.Vname;
    const Vemail = req.body.Vemail;
    const vendor = new Vendor({
        vendorName: Vname,
        vendorMail: Vemail,

    })
    vendor.save();
    res.redirect("/");
});

app.post("/login", function(req, res){
    const Vemail = req.body.Vemail;

    Vendor.findOne({vendorMail:Vemail},function(err,vendor){
        if(err)
        {
            console.log(err);
        }
        else
        {
            if(vendor === null)
            {
                res.send("Vendor Not Found. Add yourself before logging in");
            }
            else
            {
                res.redirect("addSpice");
            }
        }
    })

    
});

app.post("/addSpice",function(req,res){
    const vendor = new Vendor({
        vendorName: req.body.Vname,
        price: req.body.price

    });
    Spice.findOne({name: req.body.select},function(err,foundSpice){
        foundSpice.vendors.push(vendor);
        foundSpice.save();
        res.redirect("/addSpice");
    });
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
    console.log("Server started on port 3000");
  });