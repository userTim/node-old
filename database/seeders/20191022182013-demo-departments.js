'use strict'

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'symzhitov_departments',
            [
                {
                    name: 'Human Resources',
                    company_id: 1,
                },
                {
                    name: 'Development',
                    company_id: 1,
                },
                {
                    name: 'Accounting',
                    company_id: 1,
                },
                {
                    name: 'Research',
                    company_id: 2,
                },
                {
                    name: 'Marketing',
                    company_id: 2,
                },
            ],
            {}
        )
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('symzhitov_departments', null, {})
    },
}
