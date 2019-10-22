'use strict'
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            name: DataTypes.STRING,
            login: DataTypes.STRING,
            password: DataTypes.STRING,
            department_id: DataTypes.INTEGER,
        },
        {
            tableName: 'symzhitov_users',
        }
    )
    User.associate = function(models) {
        User.belongsTo(models.Department, { foreignKey: 'id', targetKey: 'department_id' })
    }
    return User
}
