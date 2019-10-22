'use strict'

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'symzhitov_companies',
            [
                {
                    name: 'ForceTaxi',
                },
                {
                    name: 'Amazon',
                },
                {
                    name: 'Microsoft',
                },
                {
                    name: 'Рога и копыта',
                },
                {
                    name: 'Газпром',
                },
                {
                    name: 'Денег нет, но вы держитесь',
                },
            ],
            {}
        )
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('symzhitov_companies', null, {})
    },
}
