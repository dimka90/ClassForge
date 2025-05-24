import { Router } from "express";
import { createAdminController, getAdmin, getAllAdmin} from "../controllers/adminController";
const adminrouter = Router();

adminrouter.post("/", createAdminController as any);
adminrouter.get("/", getAdmin);
adminrouter.get("/:id", getAllAdmin)
export default adminrouter;
