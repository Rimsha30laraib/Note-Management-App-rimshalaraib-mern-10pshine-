
// add pino logger
const app = require('./app');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
