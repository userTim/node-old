'use strict'
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('symzhitov_departments', {
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
            company_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: { model: { tableName: 'symzhitov_companies' }, key: 'id' },
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
        return queryInterface.dropTable('symzhitov_departments')
    },
}
