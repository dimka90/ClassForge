import { Model, DataTypes } from "sequelize";
import { DataType } from "sequelize-typescript";

import sequelize from "../config/sequilize";

class Admin extends Model{
    public id!: number;
    public userName!: string;
    public password!: string;
}

Admin.init(
    {
id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true

},
userName: {
    type: DataType.STRING,
    allowNull: false
},
password: {
type:DataTypes.STRING,
allowNull: false
}
},
{
sequelize,
tableName: "Admin",
modelName: "admins"
});

export default Admin;
