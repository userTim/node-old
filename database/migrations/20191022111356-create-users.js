'use strict'
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('symzhitov_users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            login: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            department_id: {
                type: Sequelize.INTEGER,
                references: { model: { tableName: 'symzhitov_departments' }, key: 'id' },
                onDelete: 'SET NULL',
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
        return queryInterface.dropTable('symzhitov_users')
    },
}
