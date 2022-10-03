const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type:DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      validate:{
        notString(value){
          if(typeof value!=='number'){
            throw new Error('Error, Id can only be integer.')
          }
        }
      }
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    background_image:{
      type: DataTypes.TEXT,
    },

    background_image_additional:{
      type:DataTypes.TEXT,
    },

    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },

    rating: {
      type: DataTypes.DECIMAL,
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    released:{
      type:DataTypes.DATEONLY
    }
  },  { timestamps: false });
};
