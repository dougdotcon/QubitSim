export default {
    transform: {
        "^.+\\.[t|j]sx?$": "babel-jest"
    },
    testEnvironment: 'node',
    collectCoverageFrom: [
        'src/**/*.js',
        'interface/src/algorithms/**/*.js',
        '!src/index.js',
        '!src/tests/**'
    ],
    coverageReporters: ['text', 'lcov'],
    moduleFileExtensions: ['js', 'json', 'node']
};
