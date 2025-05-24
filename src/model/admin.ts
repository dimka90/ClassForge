import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequilize";

class Admin extends Model{
    public id!: number;
    public userName!: string;
    public password!: string;
    public email!: string;
}

Admin.init(
    {
id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true

},
username: {
    type: DataTypes.STRING,
    allowNull: false
},
  email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
password: {
type:DataTypes.STRING,
allowNull: false
}
},
{
sequelize,
tableName: "admins",
modelName: "Admins"
});

export default Admin;
