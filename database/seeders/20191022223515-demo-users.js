'use strict'

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'symzhitov_users',
            [
                {
                    name: 'Timur',
                    login: 'usertim',
                    department_id: 1,
                    password: '$2b$10$Xz2Va/472J9jGYGia5srgOWaKUB/Hq1jdPMxJ3lDyVytd7yVRFFpi',
                },
                {
                    name: 'Valentin',
                    login: 'uservalya',
                    password: '$2b$10$Xz2Va/472J9jGYGia5srgOWaKUB/Hq1jdPMxJ3lDyVytd7yVRFFpi',
                },
                {
                    name: 'Oleg',
                    login: 'olegator',
                    password: '$2b$10$Xz2Va/472J9jGYGia5srgOWaKUB/Hq1jdPMxJ3lDyVytd7yVRFFpi',
                },
            ],
            {}
        )
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('symzhitov_users', null, {})
    },
}
