const fs = require('fs');
const bcrypt = require('bcryptjs');
fs.writeFileSync('hash2.txt', bcrypt.hashSync('ewqasdcxz', 10), 'utf8');
