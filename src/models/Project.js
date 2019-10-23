export default (sequelize, DataTypes) => {
    const Project = sequelize.define(
        'Project',
        {
            name: DataTypes.STRING,
            description: DataTypes.TEXT,
        },
        {
            tableName: 'symzhitov_projects',
        }
    )
    Project.associate = function(models) {
        Project.belongsToMany(models.User, {
            through: 'symzhitov_projects_users',
            sourceKey: 'id',
            foreignKey: 'project_id',
            as: 'users',
        })
    }
    return Project
}
