const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const arrFrutasVerduras = ["banana", "cebollas", "lechuga", "papas", "pimenton", "tomate"];

app.listen(3000, () =>
{
    console.log("Servidor avilitado en el puerto 3000");
})

//configurar motor de vistas
app.set("view engine", "handlebars");
app.engine("handlebars", exphbs.engine());

//Importacion Bootstrap
app.use("/bootstrap", express.static(__dirname+'/node_modules/bootstrap/dist'));
app.use("/popper", express.static(__dirname+'/node_modules/@popperjs/core/dist/umd'));

//Carpeta Assets
app.use("/assets", express.static(__dirname+"/assets"));

app.get("/", (req, res) =>
{
    res.render("index");
})

app.get("/dashboard", (req, res) =>
{
    res.render("home",
    {
        frutasoVerduras : arrFrutasVerduras,
    });
});

app.get("/productos", (req, res) =>
{
    res.render("productos", 
    {
        productos : arrFrutasVerduras,
        ruta : "/productos"
    });
})

app.get("/productos/:variable", (req, res) => 
{
    let array = arrFrutasVerduras;
    const fov = req.params.variable;

    if(array.includes(fov))
    {
         res.render("productos",
        {
            fruVerduras : fov
        });
    }
    else
    {
        res.send("<center><h1>Producto no existe.</h1></center>");
    }
});

app.get("*", (req, res) => {
    res.send("<center><h1>Esta página no existe... </h1></center>");
});

