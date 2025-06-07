import { Request, Response } from "express";
import { createCourse } from "../db/course";
import Course from "../model/course";

export async function courseController(req: Request, res: Response): Promise<Response> {
  const { code, title, level , creditUnit} = req.body;

  if (!code || !title || !level || !creditUnit) {
    return res.status(406).send({
      success: false,
      message: "Fields code, title, and level are required",
    });
  }

  try {
    const result = await createCourse({ code, title, level, creditUnit});

    return res.status(200).send({
      success: true,
      message: "Successfully created new course",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).send({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
}

export async function getAllCoursesController(req: Request, res: Response): Promise<Response> {
  try {
    const result = await Course.findAll();

    return res.status(200).send({
      success: true,
      message: "Successfully retrieved all courses",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
}
