import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequilize";

class Session extends Model {

    public id!:number;
    public name!: string;
    public startDate!: string;
    public endate!: string;
    public generatedAt!: string;
}

Session.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    generatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
},
    {
    sequelize,
    tableName: "sessions",
    modelName: "Session",
    timestamps: true}
)

export default Session