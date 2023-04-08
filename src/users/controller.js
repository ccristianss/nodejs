//const debug = require("debug")("app:module-users-controller");
const { UsersService } = require("./services");
const { Response } = require("../common/response");
const createError = require("http-errors");
module.exports.UsersController = {
  getUsers: async (req, res) => {
    try {
      let users = await UsersService.getAll();
      //res.json(users);
      Response.success(res, 200, "Lista de Usuarios", users);
    } catch (error) {
      //debug(error);
      //res.status(500).json({ message: "GetUsers: Internal server error" });
      Response.error(res);
    }
  },

  getUser: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      //debug(id);
      let user = await UsersService.getById(id);
      if (!user) {
        Response.error(res, new createError.NotFound());
      } else {
        //debug(user);
        //res.json(user);
        Response.success(res, 200, `Usuario ${id}`, user);
      }
    } catch (error) {
      //debug(error);
      //res.status(500).json({ message: "GetUser: Internal server error" });
      Response.error(res);
    }
  },

  createUsers: async (req, res) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        const insertedId = await UsersService.create(body);
        //debug(insertedId);
        //res.json(insertedId);
        Response.success(res, 201, "Usuario Agregado", insertedId);
      }
    } catch (error) {
      //debug(error);
      //res.status(500).json({ message: "CreateUser: Internal server error" });
      Response.error(res);
    }
  },
};
