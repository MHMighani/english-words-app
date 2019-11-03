const express = require("express")
const methodOverride = require("method-override")
const bodyParser = require("body-parser")
const exhbs = require("express-handlebars")

const routes = require("./routes/handlers")
const PORT = process.env.PORT || 9001;
const app = express();

app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(methodOverride("_method"))

const hbs = exhbs.create({
    defaultLayout:"main",

    helpers:{
        calculation: function(value){
            return value+1
        }
    }
})

//configuring express handlebars
app.engine("handlebars",hbs.engine)
app.set("view engine","handlebars");

app.use("/",routes)

app.listen(PORT, ()=>{
    console.log(`server is starting at PORT ${PORT}`);
    
});

var Handlebars = require('handlebars');
Handlebars.registerHelper("inc", function(value, options)
{
    return parseInt(value) + 1;
});