import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequilize";

class Timetable extends Model {
  public id!: number;
  public sessionId!: number;
  public level!: number;
  public startDate!: string;
  public endDate!: string;
  public generatedAt!: Date;
}

Timetable.init(
{


    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true

    },

sessionId: {
    type: DataTypes.NUMBER,
    allowNull: false,

},
    level: {
    type: DataTypes.STRING,
    allowNull: false
},
startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
},
endDate: {
      type: DataTypes.DATEONLY,
    allowNull: false
},
generatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
}
},
    {
        sequelize,
        tableName: "timetables",
        modelName: "Timetable"

    }
)
export default  Timetable