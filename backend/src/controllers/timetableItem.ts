
import { Request, Response } from "express";
import { createTimetableItem, getAllTimetableItems } from "../db/timetableitem";
export const createTimetableItemController = async (req: Request, res: Response) => {

      const {
      timetableId,
      courseId,
      hallId,
      invigilatorId,
      date,
      startTime,
      endTime,
    } = req.body;

  try {
  
    const item = await createTimetableItem({
      timetableId,
      courseId,
      hallId,
      invigilatorId,
      date,
      startTime,
      endTime,
    });

    res.status(201).json({ 
        success: true,
        message: 
        "Timetable item created",
        data: item 
    });
  } catch (error: any) {
    res.status(500).json(
        {
        succes: false,
        message: "Failed to create timetable item", 
        error: error.message });
  }
};

export const getAllTimetableItemController = async (_: Request, res: Response) => {
  try {
    const items = await getAllTimetableItems();
    res.status(200).send(
        {
            success: true,
            message: "Successfullly retrived all timetable items",
            data: items
        })
  } catch (error: any) {
    res.status(500).json({ message: "Failed to fetch timetable items", error: error.message });
  }
};

// export const getTimetableItem = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const item = await TimetableItem.findByPk(id);

//     if (!item) return res.status(404).json({ message: "Item not found" });

//     res.status(200).json(item);
//   } catch (error: any) {
//     res.status(500).json({ message: "Error retrieving item", error: error.message });
//   }
// };

// export const deleteTimetableItem = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;

//     const item = await TimetableItem.findByPk(id);
//     if (!item) return res.status(404).json({ message: "Item not found" });

//     await item.destroy();
//     res.status(200).json({ message: "Item deleted successfully" });
//   } catch (error: any) {
//     res.status(500).json({ message: "Error deleting item", error: error.message });
//   }
// };
