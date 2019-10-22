'use strict'
module.exports = (sequelize, DataTypes) => {
    const Department = sequelize.define(
        'Department',
        {
            name: DataTypes.STRING,
            company_id: DataTypes.INTEGER,
        },
        {
            talbeName: 'symzhitov_departments',
        }
    )
    Department.associate = function(models) {
        Department.belongsTo(models.Company, { foreignKey: 'id', targetKey: 'company_id' })
        Department.hasMany(models.User, { foreignKey: 'id', sourceKey: 'department_id' })
    }
    return Department
}
