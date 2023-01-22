import express from "express";
import morgan from "morgan";
import cors from "cors";
import fileUpload from "express-fileupload";

// Routes
import LoginRoutes from "./routes/login.routes";
import FileRoutes from "./routes/file.routes";
import cliRoutes from "./routes/clientes.routes";
import prodRoutes from "./routes/productos.routes";
import cajRoutes from "./routes/caja.routes";
import comprasRoutes from "./routes/compras.routes";
import conceptoRoutes from "./routes/concepto.routes";

const app = express();

// Settings
app.set("port", 4100);
app.use(fileUpload());

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// CORS

app.use(cors());

// Routes
app.use("/api/login", LoginRoutes);
app.use("/api/file", FileRoutes);
app.use("/api/clientes", cliRoutes);
app.use("/api/prod", prodRoutes);
app.use("/api/caja", cajRoutes);
app.use("/api/compras", comprasRoutes);
app.use("/api/concepto", conceptoRoutes);

export default app;