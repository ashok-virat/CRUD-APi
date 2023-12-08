const path = require('path');

module.exports = {
    entry: './index.js', // Replace with the entry point of your application
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};