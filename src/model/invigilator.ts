import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequilize";

class Invigilator extends Model{
    public id!: number;
    public name!: string;
    public email!:string;
}

Invigilator.init(
    {
id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true

},
name: {
    type: DataTypes.STRING,
    allowNull: false
},
  email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
},
{
sequelize,
tableName: "invigilators",
modelName: "Invigilator"
});

export default Invigilator;
