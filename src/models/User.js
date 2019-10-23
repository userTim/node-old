export default (sequelize, DataTypes) => {
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
        User.belongsTo(models.Department, { foreignKey: 'department_id', as: 'department' })
        User.belongsToMany(models.Project, {
            through: 'symzhitov_projects_users',
            sourceKey: 'id',
            foreignKey: 'user_id',
            as: 'projects',
        })
    }
    return User
}
