module.exports = {
    port: '3000',
    database: {
        host: 'localhost',
        user: 'root',
        dbName: 'todo_db'
    },
    features: {
        jwt: true,
        secret: 'th0oJJgPYFWQ3o4wF2FyjIA8dAiHBKkN', // To be stored as env variable
        unprotectedRoutes: [
            '/',
            '/login'
        ]
    }
}