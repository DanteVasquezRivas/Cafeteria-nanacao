require("dotenv").config();

const { database, initDB, clearDB } = require("../database/dbConfig");
const {
  addCafe,
  getAllCafes,
  updateCafe,
  deleteCafe,
} = require("../database/models/cafesModels");
const {
  update_cafe_controller,
  delete_cafe_controller,
} = require("../controllers/cafes/cafesControllers");

beforeAll(async () => {
  await initDB();
});

afterEach(async () => {
  // await clearDB()
});

afterAll(async () => {
  await database.end();
});

describe("addCafe", () => {
  it("Debería agregar un cafe con código de estado 201", async () => {
    const nombre = "CafeTest";
    const result = await addCafe(nombre);
    expect(result.status).toEqual(201);
  });
});

describe("getAllCafes", () => {
  it("Debería recibir un arreglo de cafés y un código 200", async () => {
    
    const cafes = await getAllCafes();

    expect(Array.isArray(cafes)).toBe(true);

    expect(cafes.length).toBeGreaterThan(0);

    cafes.forEach((cafe) => {
      expect(typeof cafe).toBe("object");
    });
  });
});

describe("PUT /cafes", () => {
  it("Debe retornar un  400 si el id del params es diferente al del body", async () => {
    const req = {
      params: { id: 123 },
      body: { id: 456, nombre: "Nuevo nombre" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await update_cafe_controller(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      msg: "El id en los parámetros no coincide con el id en el payload",
    });
    expect(next).not.toHaveBeenCalled();
  });
});

describe("deleteCafe", () => {
  it("Debe retornar 404 si se intenta borrar un café con id no existente", async () => {
    const req = {
      params: { id: 821 },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await delete_cafe_controller(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ msg: "Café no encontrado" });
    expect(next).not.toHaveBeenCalled();
  });
});
