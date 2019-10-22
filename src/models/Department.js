'use strict'
module.exports = (sequelize, DataTypes) => {
    const Department = sequelize.define(
        'Department',
        {
            name: DataTypes.STRING,
            company_id: DataTypes.INTEGER,
        },
        {
            tableName: 'symzhitov_departments',
        }
    )
    Department.associate = function(models) {
        Department.belongsTo(models.Company, { foreignKey: 'company_id', as: 'department' })
        Department.hasMany(models.User, { foreignKey: 'department_id', as: 'users' })
    }
    return Department
}
