import { Model, DataTypes} from "sequelize"
import sequelize from "../config/sequilize";
class Department extends Model{
public id!:number;
public name!: string;
}

Department.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    }
},
{
    sequelize,
    tableName: "departments",
    modelName: "Department"
})