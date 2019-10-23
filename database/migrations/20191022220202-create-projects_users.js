'use strict'
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('symzhitov_projects_users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            project_id: {
                type: Sequelize.INTEGER,
                references: { model: { tableName: 'symzhitov_projects' }, key: 'id' },
                onDelete: 'CASCADE',
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: { model: { tableName: 'symzhitov_users' }, key: 'id' },
                onDelete: 'CASCADE',
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('now'),
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('now'),
            },
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('symzhitov_projects_users')
    },
}
