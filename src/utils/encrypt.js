import bcrypt from "bcryptjs";
class Encryption {
  constructor() {
    this.salt = 10
  }

  encrypt(password) {
    return bcrypt.hash(password, this.salt);
  }

  validation(password, hash) {
    return bcrypt.compare(password, hash);
  }
}

export default Encryption
