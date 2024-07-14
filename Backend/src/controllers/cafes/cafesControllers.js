const {
  addCafe,
  getAllCafes,
  updateCafe,
  deleteCafe,
} = require("../../database/models/cafesModels");

const add_cafe_controller = async (req, res, next) => {
  try {
    const { nombre } = req.body;
    console.log("Nombre del café a agregar:", nombre);

    const response = await addCafe(nombre);
    console.log("Respuesta de la base de datos:", response);

    res.send(response);
  } catch (error) {
    console.error("Error al agregar café:", error);
    next(error);
  }
};

const getCafes = async (req, res, next) => {
  try {
    const cafes = await getAllCafes();
    res.status(200).json(cafes);
  } catch (error) {
    next(error);
  }
};

const update_cafe_controller = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: idPayload, nombre } = req.body;

    if (parseInt(id) !== parseInt(idPayload)) {
      return res
        .status(400)
        .json({
          msg: "El id en los parámetros no coincide con el id en el payload",
        });
    }

    const response = await updateCafe(id, { nombre });
    res.send(response);
  } catch (error) {
    console.error("Error al actualizar café:", error);
    next(error);
  }
};

const delete_cafe_controller = async (req, res, next) => {
  try {
    const { id } = req.params;

    const response = await deleteCafe(id);
    if (response.status === 404) {
      return res.status(404).json({ msg: "Café no encontrado" });
    }

    res.status(200).json({ msg: "Café eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar café:", error);
    next(error);
  }
};

module.exports = {
  add_cafe_controller,
  getCafes,
  update_cafe_controller,
  delete_cafe_controller,
};
