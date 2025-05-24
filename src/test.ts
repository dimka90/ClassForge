import sequelize from "./config/sequilize";
import Admin from "./model/admin";
const test = async () =>{

    try {
        await sequelize.authenticate();
        console.log("Database Connected successfully")
        
        let event = await Admin.build({
            userName: "Dimka",
            password: "123345"

        });

        console.log("Test model instance", event.toJSON())
    } catch (error) {
         console.error('❌ Error during test:', error);
    }
    finally{
          await sequelize.close();
    }


}

test();