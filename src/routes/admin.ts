import { Router } from "express";
import { createAdminController, getAdmin, getAllAdmin} from "../controllers/adminController";
import { adminloginController } from "../controllers/adminController";
import { createHallController } from "../controllers/hallController";
import { getHallController } from "../controllers/hallController";
import { getAllInvigilatorsController, invigilatorController } from "../controllers/invigilator";
import { createSession, getAllSession } from "../db/session";
import { getAllSessionController, sessionController } from "../controllers/session";
const adminrouter = Router();


adminrouter.post("/", createAdminController as any);
adminrouter.post("/login", adminloginController  as any)

//  Route for Hall
adminrouter.post("/hall", createHallController as any )
adminrouter.get("/halls", getHallController as any);


// Invigilator

adminrouter.post("/invigilator", invigilatorController as any);
adminrouter.get("/invigilator", getAllInvigilatorsController as any)




// Session

adminrouter.post("/session", sessionController  as any)
adminrouter.get("/session", getAllSessionController  as any)

adminrouter.get("/:id", getAdmin as any)
adminrouter.get("/",  getAllAdmin   as any);


export default adminrouter;
