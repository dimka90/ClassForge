import { Request, Response } from "express";
import TimetableGeneticAlgorithm from "../utils/TimetableGeneticAlgorithm";
import { createTimeTable } from "../db/timetable";
import { createSession } from "../db/session";

export async function generateGeneticTimetableController(req: Request, res: Response): Promise<Response> {
    const { 
        name, 
        startDate, 
        endDate, 
        level,
        geneticConfig // Optional: custom genetic algorithm parameters
    } = req.body;

    // Validation
    if (!name || !startDate || !endDate || !level) {
        return res.status(406).send({
            success: false,
            message: "Fields name, startDate, endDate, and level are required"
        });
    }

    try {
        // Create session first
        const session = await createSession({ name, startDate, endDate });
        const sessionId = session["dataValues"].id;

        // Create timetable
        const timetable = await createTimeTable({ sessionId, level });
        const timetableId = timetable["dataValues"].id;

        // Initialize genetic algorithm
        const ga = new TimetableGeneticAlgorithm(geneticConfig);

        // Generate timetable using genetic algorithm
        console.log(`Starting genetic algorithm for level ${level}...`);
        const schedule = await ga.generateAndSaveTimetable(timetableId, level, startDate, endDate);

        // Get statistics
        const stats = ga.getTimetableStatistics(schedule);

        return res.status(201).send({
            success: true,
            message: "Timetable successfully generated using genetic algorithm",
            data: {
                timetable,
                session,
                schedule,
                statistics: stats
            }
        });

    } catch (error: any) {
        console.error('Error generating timetable:', error);
        return res.status(400).send({
            success: false,
            message: error.message || "Failed to generate timetable"
        });
    }
}

export async function optimizeTimetableController(req: Request, res: Response): Promise<Response> {
    const { timetableId, geneticConfig } = req.body;

    if (!timetableId) {
        return res.status(406).send({
            success: false,
            message: "Timetable ID is required"
        });
    }

    try {
        // Get existing timetable details
        const timetable = await require("../model/timetable").default.findByPk(timetableId, {
            include: [{ model: require("../model/session").default }]
        });

        if (!timetable) {
            return res.status(404).send({
                success: false,
                message: "Timetable not found"
            });
        }

        const { level } = timetable;
        const { startDate, endDate } = timetable.Session;

        // Re-optimize using genetic algorithm
        const ga = new TimetableGeneticAlgorithm(geneticConfig);
        const schedule = await ga.generateAndSaveTimetable(timetableId, level, startDate, endDate);
        const stats = ga.getTimetableStatistics(schedule);

        return res.status(200).send({
            success: true,
            message: "Timetable successfully optimized",
            data: {
                schedule,
                statistics: stats
            }
        });

    } catch (error: any) {
        console.error('Error optimizing timetable:', error);
        return res.status(400).send({
            success: false,
            message: error.message || "Failed to optimize timetable"
        });
    }
}

export async function getTimetableWithDetailsController(req: Request, res: Response): Promise<Response> {
    const { timetableId } = req.params;

    try {
        // Get timetable items with all related data
        const timetableItems = await require("../model/timetableitem").default.findAll({
            where: { timetableId },
            include: [
                { model: require("../model/course").default },
                { model: require("../model/hall").default },
                { model: require("../model/invigilator").default },
                { 
                    model: require("../model/timetable").default,
                    include: [{ model: require("../model/session").default }]
                }
            ],
            order: [['date', 'ASC'], ['startTime', 'ASC']]
        });

        if (timetableItems.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No timetable items found"
            });
        }

        // Group by date for better presentation
        const groupedByDate = timetableItems.reduce((acc: any, item: any) => {
            const date = item.date;
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(item);
            return acc;
        }, {});

        // Calculate statistics
        const stats = {
            totalExams: timetableItems.length,
            totalDays: Object.keys(groupedByDate).length,
            totalHalls: new Set(timetableItems.map((item: any) => item.hallId)).size,
            examsByDate: Object.keys(groupedByDate).map(date => ({
                date,
                examCount: groupedByDate[date].length
            }))
        };

        return res.status(200).send({
            success: true,
            message: "Timetable retrieved successfully",
            data: {
                timetableItems,
                groupedByDate,
                statistics: stats
            }
        });

    } catch (error: any) {
        console.error('Error retrieving timetable:', error);
        return res.status(500).send({
            success: false,
            message: error.message || "Failed to retrieve timetable"
        });
    }
}

export async function validateTimetableController(req: Request, res: Response): Promise<Response> {
    const { timetableId } = req.params;

    try {
        const timetableItems = await require("../model/timetableitem").default.findAll({
            where: { timetableId }
        });

        if (timetableItems.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No timetable items found"
            });
        }

        // Convert to schedule format for validation
        const schedule = timetableItems.map((item: any) => ({
            courseId: item.courseId,
            hallId: item.hallId,
            invigilatorIds: [item.invigilatorId], // Simplified for existing data
            timeSlot: {
                date: item.date,
                startTime: item.startTime,
                endTime: item.endTime
            },
            duration: 120 // Default duration
        }));

        // Create GA instance for validation
        const ga = new TimetableGeneticAlgorithm();
        const stats = ga.getTimetableStatistics(schedule);

        // Determine if timetable is valid
        const isValid = stats.conflicts.time === 0 && 
                       stats.conflicts.hall === 0 && 
                       stats.conflicts.invigilator === 0;

        return res.status(200).send({
            success: true,
            message: "Timetable validation completed",
            data: {
                isValid,
                statistics: stats,
                conflicts: stats.conflicts
            }
        });

    } catch (error: any) {
        console.error('Error validating timetable:', error);
        return res.status(500).send({
            success: false,
            message: error.message || "Failed to validate timetable"
        });
    }
}