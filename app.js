import express from "express";
import logger from "morgan";
import cors from "cors";
import { contactsRouter } from "./routes/api/contacts.js";
import { usersRouter } from "./routes/api/users.js";
export const app = express();
import { auth } from "./middlewares/passport.js";
import { STORE_AVATARS_DIRECTORY } from "./middlewares/multer.js";

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(express.static(STORE_AVATARS_DIRECTORY));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", auth, contactsRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});
