const express = require("express");
const Contenedor = require("./class/contenedor");
const { Router } = express;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

const productos = new Contenedor(__dirname + "/data/productos.json");
const router = Router();

app.use("/api/productos", router);
app.use(express.static("./views"));
app.listen(8080);

router.get("/", async (req, res) => {
  const data = await productos.getAll();
    return res.json(data);
  });
  
  router.get("/:id",async (req, res) => {
    let id = Number(req.params.id);
    let data = await productos.getById(id);
    return res.json( data);
  });
  
  router.post("/", async (req, res) => {
    let obj = req.body;
    let data = await productos.save(obj);
    return res.json(data);
  });
  
  router.put("/:id", async (req, res) => {
    let obj = req.body;
    let id = Number(req.params.id);
    let data = await productos.update(id, obj);
    return res.json( data);
  });
  
  router.delete("/:id", async(req, res) => {
    let id = Number(req.params.id);
    let data = await productos.deleteById(id);
    return res.json(data);
  });