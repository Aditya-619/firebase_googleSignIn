const admin = require('../config/firebaseConfig');

class Middleware {
  async decodeToken(req, res, next) {

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        msg: "Token required*",
      });
    }
    const token = authHeader.split(" ")[1];
    console.log('Auth Header:', authHeader);
    console.log('Extracted Token:', token);

    try {
      const decodedValue = await admin.auth().verifyIdToken(token);
      console.log('Decoded Value:', decodedValue);
      if (decodedValue) {
        req.user = decodedValue;
        return next();
      } else {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }
    } catch (error) {
      console.log('Error during token verification:', error.message);
      return res.status(500).json({ message: 'Internal Error', error: error.message });
    }
  }
}

module.exports = new Middleware();
