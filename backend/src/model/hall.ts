import { Model } from "sequelize";
import { DataTypes } from "sequelize";
import sequelize from "../config/sequilize";
class Hall extends Model{
    public id!: number;
    public name!:string;
    public capacity!: number;
}

Hall.init({
id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
},
name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
},
capacity: {
    type: DataTypes.INTEGER,
    allowNull: false
}
},
{ 
    sequelize,
    tableName: "halls",
    modelName: "Hall",
    timestamps: true
}
)
export default Hall