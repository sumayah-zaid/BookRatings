const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

app.use(cors())

require('./server/config/mongoose');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./server/routes/book')(app);
app.use("/uploads", express.static('uploads'))


app.listen(port, () => console.log(`Listening on port: ${port}`));