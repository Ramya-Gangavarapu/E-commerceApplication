const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3001', // Allow only your frontend origin
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

module.exports = cors(corsOptions);