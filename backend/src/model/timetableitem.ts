import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequilize";

import Timetable from "./timetable";
import Course from "./course";
import Hall from "./hall";
import Invigilator from "./invigilator";
class TimetableItem extends Model {
  public id!: number;
  public timetableId!: number;
  public courseId!: number;
  public hallId!: number;
  public invigilatorId!: number;
  public date!: string;
  public startTime!: string;
  public endTime!: string;

  static associate() {
 TimetableItem.belongsTo(Timetable, { foreignKey: "timetableId" });
  TimetableItem.belongsTo(Course, { foreignKey: "courseId" });
  TimetableItem.belongsTo(Hall, { foreignKey: "hallId" });
  TimetableItem.belongsTo(Invigilator, { foreignKey: "invigilatorId" });
  }
}

TimetableItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    timetableId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hallId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    invigilatorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "timetable_items",
    modelName: "TimetableItem",
  }
);

export default TimetableItem;
