import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequilize";
class Course extends Model{
public id!: number;
public  code!: string;     
public title!: string;    
public level!: string;
public creditUint!: string;

}

Course.init({
id:{
type: DataTypes.INTEGER,
allowNull: false,
primaryKey: true,
autoIncrement: true
},
code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
},
title: {
    type: DataTypes.STRING,
    allowNull: false,
},
level: {
    type: DataTypes.STRING,
    allowNull: false
},
creditUnit: {
    type: DataTypes.STRING,
    allowNull: false
}
},
{
sequelize,
tableName:"courses",
modelName:"Course",
timestamps: true
}
)

export default Course