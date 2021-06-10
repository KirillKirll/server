const User = require("./models/User");
const Role = require("./models/Role");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { secret } = require("./config");

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, secret, { expiresIn: "30d" });
};

class authController {
  async signUp(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors });
      }
      const { username, password, email, avatar, role, linkedIn } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким именем уже существует" });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      // const userRole = await Role.findOne({ value: "USER" });
      const user = new User({
        email,
        password: hashPassword,
        username,
        avatar,
        role,
        linkedIn,
      });
      await user.save();
      const token = generateAccessToken(user._id, user.roles);
      return res.json({ token });
      // return res.json({ message: "Пользователь успешно зарегистрирован" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Registration error" });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors });
      }
      if (!user) {
        return res
          .status(400)
          .json({ message: `Пользователь ${username} не найден` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: `Введен неверный пароль` });
      }
      const token = generateAccessToken(user._id, user.roles);
      return res.json({ token });
    } catch (e) {
      res.status(400).json({ message: "Login error" });
    }
  }

  async me(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, secret);
      const userId = decodedToken.id;
      const user = await User.findOne({ _id: userId }).then((data) => {
        res.status(200).json(data);
      });
      return user;
    } catch (e) {
      console.log(e);
      return res.status(401).send("unauthorized");
    }
  }
}

module.exports = new authController();
