import { Router } from "express";
import { createAdminController, getAdmin, getAllAdmin} from "../controllers/adminController";
import { adminloginController } from "../controllers/adminController";
const adminrouter = Router();

adminrouter.post("/", createAdminController as any);
adminrouter.post("/login", adminloginController  as any)
adminrouter.get("/", getAdmin as any);
adminrouter.get("/:id", getAllAdmin as any)
export default adminrouter;
