import { Router } from "express";
import { createAdminController, getAdmin, getAllAdmin} from "../controllers/adminController";
import { adminloginController } from "../controllers/adminController";
import { createHallController } from "../controllers/hallController";
import { getHallController } from "../controllers/hallController";
import { getAllInvigilatorsController, invigilatorController } from "../controllers/invigilator";
import { getAllSessionController, sessionController } from "../controllers/session";
import { courseController, getAllCoursesController } from "../controllers/course";
import { getAllTimetableController, timeTableController } from "../controllers/timetable";
import {getAllTimetableItemController} from "../controllers/timetableItem"
import {createTimetableItemController }from "../controllers/timetableItem"

import {
    generateGeneticTimetableController,
    optimizeTimetableController,
    getTimetableWithDetailsController,
    validateTimetableController
} from "../controllers/geneticTimetableController";

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

// Course
adminrouter.post("/course", courseController as any)
adminrouter.get("/course", getAllCoursesController as any)

// timetable
adminrouter.post("/time-table", timeTableController as any)
adminrouter.get("/time-table", getAllTimetableController as any)

// timetable item

adminrouter.post("/time-table-item", createTimetableItemController  as any);
adminrouter.get("/time-table-item", getAllTimetableItemController  as any);

//genetic algorithm

adminrouter.post("/generate", generateGeneticTimetableController as any);
// Optimize existing timetable
adminrouter.post("/optimize", optimizeTimetableController as any);

// Get timetable with full details
adminrouter.get("/:timetableId/details", getTimetableWithDetailsController as any);

// Validate timetable for conflicts
adminrouter.get("/:timetableId/validate", validateTimetableController as any);


adminrouter.get("/:id", getAdmin as any)
adminrouter.get("/",  getAllAdmin   as any);

export default adminrouter;
