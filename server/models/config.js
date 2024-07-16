import {Sequelize} from 'sequelize';

const sequelize = new Sequelize('EventManagement', 'pduser', 'pduser',{
    host:'localhost',
    dialect:'mssql',
    dialectOptions:{
        options:{
            encrypt:false
        }
    }
})

export default sequelize;