'use strict'

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'symzhitov_projects',
            [
                {
                    name: 'Web App',
                    description: 'make web app with react',
                },
                {
                    name: 'Android App',
                    description: 'make android app',
                },
                {
                    name: 'iOS',
                    description: 'make ios app using swift',
                },
                {
                    name: 'blockchain',
                    description: 'blockchain using ethereum',
                },
                {
                    name: 'slack bot',
                    description: 'create slack bot',
                },
            ],
            {}
        )
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('symzhitov_projects', null, {})
    },
}
