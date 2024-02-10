import jwt from "jsonwebtoken";
import crypto from "crypto";

class Tokens {
  constructor() {
    this.option = {
      expires: new Date(
        Date.now() + process.env.COOKIES_EXPIRESIN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
  }
  genrateToken(data) {
    return jwt.sign(data, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRESIN,
    });
  }

  verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  }

  sendToken(user) {
    const token = user.getJwtToken();

    return {
      success: true,
      user,
      token,
      option: this.option,
    };
  }

  genrateResendToken(user) {
    const resetToken = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 min
    console.log(
      resetToken,
      Date.now() + 15 * 60 * 1000,
      crypto.createHash("sha256").update(resetToken).digest("hex")
    );
    return resetToken;
  }

  genrateHashToken(token) {
    return crypto.createHash("sha256").update(token).digest("hex");
  }
}

export default Tokens;
