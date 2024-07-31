import {DataTypes} from 'sequelize' 
import sequelize from './config.js'
// import jwt from 'jsonwebtoken'

const User = sequelize.define('User',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      verified:{
        type: DataTypes.BOOLEAN,
        // defaultValue:0,
        allowNull:false
      }
},{
    tableName:'users',
    timestamps:true
})

// User.prototype.generateJwt = async function(){
//     return jwt.sign({id:this._id}, process.env.JWT_SECRET,{
//         expiresIn:process.env.JWT_EXPIRY
//     })
// }

export default User;