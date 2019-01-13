const app = require('./server/server');

var PORT = process.env.PORT || 3001;
// console.log(process.env.PORT)

app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
});