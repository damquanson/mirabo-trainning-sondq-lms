const bcrypt = require('bcrypt');


const password = 'random_password1';
async function hash1(password) {
  const saltOrRounds =  await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, saltOrRounds);
  console.log(hash);
}


hash1(password);
