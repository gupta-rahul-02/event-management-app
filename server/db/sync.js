import sequelize from "../models/config.js";
import User from "../models/User.js";
import ResetToken from "../models/ResetToken.js";

export const  syncronizeModels = async() =>{
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");

        await User.sync({alter:true});
        const [existingConstraints] = await sequelize.query(`
            SELECT *
            FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
            WHERE TABLE_NAME = 'users' AND CONSTRAINT_TYPE = 'UNIQUE' AND CONSTRAINT_NAME = 'uq_email';
        `);

        // const [existingDefault] = await sequelize.query(`
        //     SELECT * FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
        //     WHERE TABLE_NAME = 'users' AND CONSTRAINT_TYPE = 'DEFAULT' AND CONSTRAINT_NAME + 'df_verified';`);

        //     console.log("----"+existingDefault.length)



        if(existingConstraints.length === 0){
            await sequelize.query('ALTER TABLE users ADD CONSTRAINT uq_email UNIQUE (email);');
            console.log('Unique constraint added to email column in users table.');

        }else{
            console.log('Unique constraints already exists on email column in users table')
        }
        
        await ResetToken.sync({alter:true});
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to synchronize the models:', error);
    }
}

// export default syncronizeModels();