import Course from "../model/course";
import Hall from "../model/hall";
import Invigilator from "../model/invigilator";
import TimetableItem from "../model/timetableitem";

// Types for the genetic algorithm
interface TimeSlot {
  date: string;
  startTime: string;
  endTime: string;
}

interface ExamSchedule {
  courseId: number;
  hallId: number;
  invigilatorIds: number[]; // 3 invigilators per hall
  timeSlot: TimeSlot;
  duration: number; // in minutes based on credit load
}

interface Individual {
  schedule: ExamSchedule[];
  fitness: number;
}

interface GeneticAlgorithmConfig {
  populationSize: number;
  maxGenerations: number;
  mutationRate: number;
  crossoverRate: number;
  elitismRate: number;
}

class TimetableGeneticAlgorithm {
  private courses: any[] = [];
  private halls: any[] = [];
  private invigilators: any[] = [];
  private timeSlots: TimeSlot[] = [];
  private config: GeneticAlgorithmConfig;

  constructor(config?: Partial<GeneticAlgorithmConfig>) {
    this.config = {
      populationSize: 100,
      maxGenerations: 500,
      mutationRate: 0.1,
      crossoverRate: 0.8,
      elitismRate: 0.2,
      ...config
    };
  }

  // Initialize data from database
  async initializeData(level: string, startDate: string, endDate: string) {
    // Fetch courses for the specific level
    this.courses = await Course.findAll({
      where: { level }
    });

    // Fetch all halls
    this.halls = await Hall.findAll();

    // Fetch all invigilators
    this.invigilators = await Invigilator.findAll();

    // Generate time slots
    this.timeSlots = this.generateTimeSlots(startDate, endDate);
  }

  // Generate available time slots with breaks
  private generateTimeSlots(startDate: string, endDate: string): TimeSlot[] {
    const slots: TimeSlot[] = [];
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Morning sessions: 8:00 AM - 12:00 PM
    // Afternoon sessions: 2:00 PM - 6:00 PM
    const sessions = [
      { start: "08:00", end: "12:00" },
      { start: "14:00", end: "18:00" }
    ];

    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
      // Skip weekends
      if (date.getDay() === 0 || date.getDay() === 6) continue;

      const dateStr = date.toISOString().split('T')[0];
      
      for (const session of sessions) {
        // Generate slots within each session with breaks
        const sessionSlots = this.generateSessionSlots(dateStr, session.start, session.end);
        slots.push(...sessionSlots);
      }
    }

    return slots;
  }

  // Generate slots within a session with proper breaks
  private generateSessionSlots(date: string, sessionStart: string, sessionEnd: string): TimeSlot[] {
    const slots: TimeSlot[] = [];
    const startMinutes = this.timeToMinutes(sessionStart);
    const endMinutes = this.timeToMinutes(sessionEnd);
    
    let currentTime = startMinutes;
    let examCount = 0;

    while (currentTime < endMinutes) {
      // Add break after every 2 exams (30 minutes) or 4 exams (1 hour)
      if (examCount > 0 && examCount % 2 === 0) {
        const breakDuration = examCount % 4 === 0 ? 60 : 30; // 1 hour or 30 minutes
        currentTime += breakDuration;
      }

      if (currentTime >= endMinutes) break;

      // Standard exam durations based on credit units
      const possibleDurations = [90, 120, 150, 180]; // 1.5h, 2h, 2.5h, 3h
      
      for (const duration of possibleDurations) {
        const endTime = currentTime + duration;
        if (endTime <= endMinutes) {
          slots.push({
            date,
            startTime: this.minutesToTime(currentTime),
            endTime: this.minutesToTime(endTime)
          });
        }
      }
      
      // Move to next potential slot (assuming minimum 90 minutes)
      currentTime += 90;
      examCount++;
    }

    return slots;
  }

  // Utility functions for time conversion
  private timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  private minutesToTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  }

  // Calculate exam duration based on credit units
  private getExamDuration(creditUnit: string): number {
    const credit = parseInt(creditUnit) || 3;
    // Formula: 30 minutes per credit unit + 60 minutes base
    return Math.min(Math.max(credit * 30 + 60, 90), 180); // Min 90 minutes, Max 180 minutes
  }

  // Generate initial population
  private generateInitialPopulation(): Individual[] {
    const population: Individual[] = [];

    for (let i = 0; i < this.config.populationSize; i++) {
      const individual = this.createRandomIndividual();
      population.push(individual);
    }

    return population;
  }

  // Create a random individual (timetable)
  private createRandomIndividual(): Individual {
    const schedule: ExamSchedule[] = [];

    for (const course of this.courses) {
      const duration = this.getExamDuration(course.creditUnit);
      const validSlots = this.timeSlots.filter(slot => 
        this.timeToMinutes(slot.endTime) - this.timeToMinutes(slot.startTime) >= duration
      );

      if (validSlots.length === 0) continue;

      const timeSlot = validSlots[Math.floor(Math.random() * validSlots.length)];
      const hall = this.halls[Math.floor(Math.random() * this.halls.length)];
      
      // Assign 3 random invigilators
      const shuffledInvigilators = [...this.invigilators].sort(() => Math.random() - 0.5);
      const selectedInvigilators = shuffledInvigilators.slice(0, 3);

      // Adjust time slot to match exact duration
      const startMinutes = this.timeToMinutes(timeSlot.startTime);
      const adjustedEndTime = this.minutesToTime(startMinutes + duration);

      schedule.push({
        courseId: course.id,
        hallId: hall.id,
        invigilatorIds: selectedInvigilators.map(inv => inv.id),
        timeSlot: {
          ...timeSlot,
          endTime: adjustedEndTime
        },
        duration
      });
    }

    return {
      schedule,
      fitness: this.calculateFitness(schedule)
    };
  }

  // Calculate fitness function
  private calculateFitness(schedule: ExamSchedule[]): number {
    let fitness = 1000; // Start with perfect score

    // Penalty for conflicts
    fitness -= this.calculateTimeConflicts(schedule) * 50;
    fitness -= this.calculateHallConflicts(schedule) * 100;
    fitness -= this.calculateInvigilatorConflicts(schedule) * 30;
    
    // Bonus for optimal distribution
    fitness += this.calculateDistributionBonus(schedule) * 10;
    fitness += this.calculateBreakBonus(schedule) * 5;

    return Math.max(fitness, 0);
  }

  // Calculate time conflicts penalty
  private calculateTimeConflicts(schedule: ExamSchedule[]): number {
    let conflicts = 0;
    
    for (let i = 0; i < schedule.length; i++) {
      for (let j = i + 1; j < schedule.length; j++) {
        const exam1 = schedule[i];
        const exam2 = schedule[j];
        
        if (exam1.timeSlot.date === exam2.timeSlot.date) {
          if (this.timeSlotsOverlap(exam1.timeSlot, exam2.timeSlot)) {
            conflicts++;
          }
        }
      }
    }
    
    return conflicts;
  }

  // Calculate hall conflicts
  private calculateHallConflicts(schedule: ExamSchedule[]): number {
    let conflicts = 0;
    
    for (let i = 0; i < schedule.length; i++) {
      for (let j = i + 1; j < schedule.length; j++) {
        const exam1 = schedule[i];
        const exam2 = schedule[j];
        
        if (exam1.hallId === exam2.hallId && 
            exam1.timeSlot.date === exam2.timeSlot.date &&
            this.timeSlotsOverlap(exam1.timeSlot, exam2.timeSlot)) {
          conflicts++;
        }
      }
    }
    
    return conflicts;
  }

  // Calculate invigilator conflicts
  private calculateInvigilatorConflicts(schedule: ExamSchedule[]): number {
    let conflicts = 0;
    
    for (let i = 0; i < schedule.length; i++) {
      for (let j = i + 1; j < schedule.length; j++) {
        const exam1 = schedule[i];
        const exam2 = schedule[j];
        
        if (exam1.timeSlot.date === exam2.timeSlot.date &&
            this.timeSlotsOverlap(exam1.timeSlot, exam2.timeSlot)) {
          
          const commonInvigilators = exam1.invigilatorIds.filter(id => 
            exam2.invigilatorIds.includes(id)
          );
          conflicts += commonInvigilators.length;
        }
      }
    }
    
    return conflicts;
  }

  // Check if two time slots overlap
  private timeSlotsOverlap(slot1: TimeSlot, slot2: TimeSlot): boolean {
    const start1 = this.timeToMinutes(slot1.startTime);
    const end1 = this.timeToMinutes(slot1.endTime);
    const start2 = this.timeToMinutes(slot2.startTime);
    const end2 = this.timeToMinutes(slot2.endTime);
    
    return start1 < end2 && start2 < end1;
  }

  // Calculate distribution bonus (spread exams evenly)
  private calculateDistributionBonus(schedule: ExamSchedule[]): number {
    const daysUsed = new Set(schedule.map(exam => exam.timeSlot.date));
    return daysUsed.size; // More days used = better distribution
  }

  // Calculate break bonus (proper spacing between exams)
  private calculateBreakBonus(schedule: ExamSchedule[]): number {
    let bonus = 0;
    const sortedByDate = schedule.sort((a, b) => {
      if (a.timeSlot.date !== b.timeSlot.date) {
        return a.timeSlot.date.localeCompare(b.timeSlot.date);
      }
      return this.timeToMinutes(a.timeSlot.startTime) - this.timeToMinutes(b.timeSlot.startTime);
    });

    for (let i = 0; i < sortedByDate.length - 1; i++) {
      const current = sortedByDate[i];
      const next = sortedByDate[i + 1];
      
      if (current.timeSlot.date === next.timeSlot.date) {
        const gap = this.timeToMinutes(next.timeSlot.startTime) - 
                   this.timeToMinutes(current.timeSlot.endTime);
        
        if (gap >= 30) bonus++; // Bonus for proper breaks
      }
    }
    
    return bonus;
  }

  // Selection (Tournament selection)
  private tournamentSelection(population: Individual[], tournamentSize: number = 5): Individual {
    const tournament = [];
    for (let i = 0; i < tournamentSize; i++) {
      const randomIndex = Math.floor(Math.random() * population.length);
      tournament.push(population[randomIndex]);
    }
    
    return tournament.reduce((best, current) => 
      current.fitness > best.fitness ? current : best
    );
  }

  // Crossover (Single-point crossover)
  private crossover(parent1: Individual, parent2: Individual): Individual[] {
    if (Math.random() > this.config.crossoverRate) {
      return [parent1, parent2];
    }

    const crossoverPoint = Math.floor(Math.random() * parent1.schedule.length);
    
    const child1Schedule = [
      ...parent1.schedule.slice(0, crossoverPoint),
      ...parent2.schedule.slice(crossoverPoint)
    ];
    
    const child2Schedule = [
      ...parent2.schedule.slice(0, crossoverPoint),
      ...parent1.schedule.slice(crossoverPoint)
    ];

    return [
      { schedule: child1Schedule, fitness: this.calculateFitness(child1Schedule) },
      { schedule: child2Schedule, fitness: this.calculateFitness(child2Schedule) }
    ];
  }

  // Mutation
  private mutate(individual: Individual): Individual {
    const mutatedSchedule = [...individual.schedule];
    
    for (let i = 0; i < mutatedSchedule.length; i++) {
      if (Math.random() < this.config.mutationRate) {
        // Randomly change hall, time slot, or invigilators
        const mutationType = Math.floor(Math.random() * 3);
        
        switch (mutationType) {
          case 0: // Change hall
            mutatedSchedule[i].hallId = this.halls[Math.floor(Math.random() * this.halls.length)].id;
            break;
          case 1: // Change time slot
            const validSlots = this.timeSlots.filter(slot => 
              this.timeToMinutes(slot.endTime) - this.timeToMinutes(slot.startTime) >= mutatedSchedule[i].duration
            );
            if (validSlots.length > 0) {
              const newSlot = validSlots[Math.floor(Math.random() * validSlots.length)];
              const startMinutes = this.timeToMinutes(newSlot.startTime);
              mutatedSchedule[i].timeSlot = {
                ...newSlot,
                endTime: this.minutesToTime(startMinutes + mutatedSchedule[i].duration)
              };
            }
            break;
          case 2: // Change invigilators
            const shuffled = [...this.invigilators].sort(() => Math.random() - 0.5);
            mutatedSchedule[i].invigilatorIds = shuffled.slice(0, 3).map(inv => inv.id);
            break;
        }
      }
    }

    return {
      schedule: mutatedSchedule,
      fitness: this.calculateFitness(mutatedSchedule)
    };
  }

  // Main genetic algorithm
  async generateTimetable(level: string, startDate: string, endDate: string): Promise<ExamSchedule[]> {
    await this.initializeData(level, startDate, endDate);
    
    if (this.courses.length === 0) {
      throw new Error(`No courses found for level: ${level}`);
    }

    let population = this.generateInitialPopulation();
    let bestIndividual = population.reduce((best, current) => 
      current.fitness > best.fitness ? current : best
    );

    console.log(`Starting evolution with ${this.courses.length} courses`);
    console.log(`Initial best fitness: ${bestIndividual.fitness}`);

    for (let generation = 0; generation < this.config.maxGenerations; generation++) {
      // Sort population by fitness
      population.sort((a, b) => b.fitness - a.fitness);
      
      // Keep elite individuals
      const eliteCount = Math.floor(this.config.populationSize * this.config.elitismRate);
      const newPopulation = population.slice(0, eliteCount);

      // Generate new individuals through crossover and mutation
      while (newPopulation.length < this.config.populationSize) {
        const parent1 = this.tournamentSelection(population);
        const parent2 = this.tournamentSelection(population);
        
        const [child1, child2] = this.crossover(parent1, parent2);
        
        newPopulation.push(this.mutate(child1));
        if (newPopulation.length < this.config.populationSize) {
          newPopulation.push(this.mutate(child2));
        }
      }

      population = newPopulation;
      const currentBest = population.reduce((best, current) => 
        current.fitness > best.fitness ? current : best
      );

      if (currentBest.fitness > bestIndividual.fitness) {
        bestIndividual = currentBest;
        console.log(`Generation ${generation}: New best fitness: ${bestIndividual.fitness}`);
      }

      // Early termination if perfect solution found
      if (bestIndividual.fitness >= 1000) {
        console.log(`Perfect solution found at generation ${generation}`);
        break;
      }

      // Log progress every 50 generations
      if (generation % 50 === 0) {
        console.log(`Generation ${generation}: Best fitness: ${bestIndividual.fitness}`);
      }
    }

    console.log(`Evolution completed. Final best fitness: ${bestIndividual.fitness}`);
    return bestIndividual.schedule;
  }

  // Save generated timetable to database
  async saveTimetableToDatabase(timetableId: number, schedule: ExamSchedule[]): Promise<void> {
    try {
      // Clear existing timetable items for this timetable
      await TimetableItem.destroy({
        where: { timetableId }
      });

      // Insert new timetable items
      const timetableItems = schedule.map(exam => ({
        timetableId,
        courseId: exam.courseId,
        hallId: exam.hallId,
        invigilatorId: exam.invigilatorIds[0], // Primary invigilator
        date: exam.timeSlot.date,
        startTime: exam.timeSlot.startTime,
        endTime: exam.timeSlot.endTime
      }));

      await TimetableItem.bulkCreate(timetableItems);
      
      // Note: For multiple invigilators per exam, you might want to create a separate junction table
      console.log(`Saved ${timetableItems.length} timetable items to database`);
    } catch (error) {
      console.error('Error saving timetable to database:', error);
      throw error;
    }
  }

  // Generate and save timetable
  async generateAndSaveTimetable(timetableId: number, level: string, startDate: string, endDate: string): Promise<ExamSchedule[]> {
    const schedule = await this.generateTimetable(level, startDate, endDate);
    await this.saveTimetableToDatabase(timetableId, schedule);
    return schedule;
  }

  // Get timetable statistics
  getTimetableStatistics(schedule: ExamSchedule[]): any {
    const stats = {
      totalExams: schedule.length,
      totalDays: new Set(schedule.map(e => e.timeSlot.date)).size,
      totalHalls: new Set(schedule.map(e => e.hallId)).size,
      totalInvigilators: new Set(schedule.flatMap(e => e.invigilatorIds)).size,
      averageDuration: schedule.reduce((sum, e) => sum + e.duration, 0) / schedule.length,
      conflicts: {
        time: this.calculateTimeConflicts(schedule),
        hall: this.calculateHallConflicts(schedule),
        invigilator: this.calculateInvigilatorConflicts(schedule)
      }
    };

    return stats;
  }
}

export default TimetableGeneticAlgorithm;