import Course from "../model/course";
export async function createCourse(course: CourseDetails) {
  const { code, title, level , creditUnit} = course;

  try {
    const existing = await Course.findOne({ where: { code } });
    if (existing) {
      throw new Error("Course with this code already exists");
    }

    const newCourse = await Course.create({ code, title, level , creditUnit});
    return newCourse;
  } catch (error) {
    throw error;
  }
}
