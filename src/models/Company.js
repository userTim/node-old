export default (sequelize, DataTypes) => {
    const Company = sequelize.define(
        'Company',
        {
            name: DataTypes.STRING,
        },
        {
            tableName: 'symzhitov_companies',
        }
    )
    Company.associate = function(models) {
        Company.hasMany(models.Department, { foreignKey: 'id', sourceKey: 'company_id' })
    }
    return Company
}
