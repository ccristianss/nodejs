const debug = require("debug")("app:module-products-controller");
const { ProductsService } = require("./services");
const { Response } = require("../common/response");
const createError = require("http-errors");
module.exports.ProductsController = {
  getProducts: async (req, res) => {
    try {
      let products = await ProductsService.getAll();
      //res.json(products);
      Response.success(res, 200, "Lista de productos", products);
    } catch (error) {
      debug(error);
      //res.status(500).json({ message: "GetProducts: Internal server error" });
      Response.error(res);
    }
  },

  getProduct: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      //debug(id);
      let product = await ProductsService.getById(id);
      if (!product) {
        Response.error(res, new createError.NotFound());
      } else {
        //debug(product);
        //res.json(product);
        Response.success(res, 200, `Producto ${id}`, product);
      }
    } catch (error) {
      debug(error);
      //res.status(500).json({ message: "GetProduct: Internal server error" });
      Response.error(res);
    }
  },

  createProducts: async (req, res) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        const insertedId = await ProductsService.create(body);
        //debug(insertedId);
        //res.json(insertedId);
        Response.success(res, 201, "Producto Agregado", insertedId);
      }
    } catch (error) {
      debug(error);
      //res.status(500).json({ message: "CreateProduct: Internal server error" });
      Response.error(res);
    }
  },

  generateReport: (req, res) => {
    try {
      ProductsService.generateReport("Inventario", res);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
};
