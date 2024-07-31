import {Sequelize} from 'sequelize';

// const sequelize = new Sequelize('EventManagement', 'pduser', 'pduser',{
//     host:'localhost',
//     dialect:'mssql',
//     dialectOptions:{
//         options:{
//             encrypt:false
//         }
//     }
// })

// export default sequelize;



const sequelize = new Sequelize('EventManagement', 'pduser', 'pduser', {
    host: 'localhost',
    dialect: 'mssql',
    dialectOptions: {
        options: {
            encrypt: false
        }
    },
    logging:console.log,
    pool: {
        max: 5,
        min: 0,
        acquire: 60000,  // Increase acquire timeout
        idle: 10000
    }
});


export default sequelize;