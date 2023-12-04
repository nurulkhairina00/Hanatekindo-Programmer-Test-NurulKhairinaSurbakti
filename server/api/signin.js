var config = require("../database/config");

const api = (app, db, jwt) => {
  app.post(`/api/signin`, async (req, res) => {
    const { username } = req.body;

    const sql = `SELECT * FROM users WHERE user_account = $1`;
    await db
      .oneOrNone(sql, [username])
      .then((data) => {
        if (!data) {
          return res.status(401).json({ error: "Username not registered" });
        }

        const token = jwt.sign(data, config.secret, {
          expiresIn: "12h",
        });
        data.token = token;
        res.status(200).json(data);
      })
      .catch((err) => {
        throw err;
      });
  });
};

module.exports = api;
