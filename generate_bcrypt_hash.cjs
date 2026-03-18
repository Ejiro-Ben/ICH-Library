// Usage: node generate_bcrypt_hash.js yourpassword
const bcrypt = require('bcryptjs');

const password = process.argv[2];
if (!password) {
  console.error('Usage: node generate_bcrypt_hash.js yourpassword');
  process.exit(1);
}

bcrypt.hash(password, 10, (err, hash) => {
  if (err) throw err;
  console.log('Bcrypt hash for password:', password);
  console.log(hash);
});
