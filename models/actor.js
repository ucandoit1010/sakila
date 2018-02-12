/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var Actor = sequelize.define('actor', {
    actor_id: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    tableName: 'actor'
  });

  return Actor;
};


// ,
//     last_update: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
//     }
