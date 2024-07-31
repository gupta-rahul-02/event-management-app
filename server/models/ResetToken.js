import {DataTypes} from 'sequelize'
import sequelize from './config.js'
import User from './User.js'

const ResetToken = sequelize.define('Otp',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    token:{
        type:DataTypes.STRING,
        allowNull:false
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:User,
            key:'id'
        }
    }
},
{
    tableName:'resetToken',
    timestamps:true
})

User.hasMany(ResetToken, { foreignKey: 'userId' });
ResetToken.belongsTo(User, { foreignKey: 'userId' });

export default ResetToken;