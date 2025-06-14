import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequilize";
import Session from "./session";

class Timetable extends Model {
  public id!: number;
  public sessionId!: number;
  public level!: string;
  public generatedAt!: Date;

  static associate(){
    Timetable.belongsTo(Session, {foreignKey: "sessionId"})
  }
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
generatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
}
},
    {
        sequelize,
        tableName: "timetables",
        modelName: "Timetable",
        timestamps: true

    }
)
export default  Timetable