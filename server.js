const credentials = require('./credentials');
const express = require('express');
const app = express();
let server;
let port = process.env.PORT || 8080;

  const http = require('http');
  server = http.createServer(app);

const io = require('socket.io')(server);
const RoomService = require('./RoomService')(io);
io.sockets.on('connection', RoomService.listen);
io.sockets.on('error', e => console.log(e));
app.use(express.static(__dirname + '/public'));
app.get('*', function(req, res) {
    res.sendFile(`${__dirname}/index.html`);
});
server.listen(port, () => console.log(`Server is running on port ${port}`));
