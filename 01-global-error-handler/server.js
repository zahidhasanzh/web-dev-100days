import express from "express";
import { BadRequest, NotFountError } from "./customHandler.js";

const app = express();

app.use(express.json());

async function getProducts() {
  return [{ id: "1", name: "product 1" }];
}

app.get("/", (req, res) => {
  res.json({ message: "success!" });
});

app.get("/api/products", async (req, res, next) => {
  const products = await getProducts();
  res.json(products);
});

async function createUser(name, email, password) {
  const error = new Error("Dupplicated email");
  error.code = "23505";
  throw error;
  return true;
}

app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    await createUser(name, email, password);
  } catch (err) {
    if (err.code === "23505") {
      throw new NotFountError("Email is already taken!!!!");
    }
    throw err;
  }
  res.json({ message: "success" });
});

app.use((error, req, res, next) => {
  const isProd = process.env.NODE_ENV === "production";
  if (error.name === "BadRequest") {
    res
      .status(error.status)
      .json({ message: isProd ? "semthing went wrong" : error.message, fields: ["email"] });
  } else {
    res
      .status(error.status)
      .json({ message: isProd ? "semthing went wrong" : error.message });
  }

  return;
});

const PORT = 4600;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
