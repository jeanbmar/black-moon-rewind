const gateway = require('./gateway');

const port = 19947;

gateway.listen(port, () => {
  console.log(`listening on ${port}`);
});
