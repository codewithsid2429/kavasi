const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync('ewqasdcxz', 10);
console.log('HASH:', hash);
