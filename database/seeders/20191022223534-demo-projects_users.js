'use strict'

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'symzhitov_projects_users',
            [
                {
                    project_id: 1,
                    user_id: 4,
                },
                {
                    project_id: 1,
                    user_id: 5,
                },
                {
                    project_id: 2,
                    user_id: 4,
                },
                {
                    project_id: 3,
                    user_id: 4,
                },
                {
                    project_id: 4,
                    user_id: 6,
                },
                {
                    project_id: 5,
                    user_id: 4,
                },
            ],
            {}
        )
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('symzhitov_projects_users', null, {})
    },
}
