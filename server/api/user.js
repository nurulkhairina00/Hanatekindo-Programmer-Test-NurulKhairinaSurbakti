const api = (app, db) => {
  // insert user data
  app.post(`/api/user/insert`, async (req, res) => {
    const { account, hashedPassword, fullname, point } = req.body;
    const sqlCheck = `SELECT * FROM users WHERE user_account = $1`;
    const checkAccount = await db
      .oneOrNone(sqlCheck, [account])
      .then((data) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });

    if (checkAccount) {
      return res.status(200).send({
        status: "Warning",
        message: "The account is already in use",
      });
    }

    const sql = `
          INSERT INTO users (
              user_account,
              user_password,
              user_fullname,
              user_point
          ) VALUES (
              $1, $2, $3, $4
          )
      `;
    await db
      .any(sql, [account, hashedPassword, fullname, point])
      .then(() => {
        return res.status(200).send({
          status: "Success",
          message: "Data Added Successfully",
        });
      })
      .catch((err) => {
        throw err;
      });
  });

  // get user data
  app.get(`/api/user/get-data`, async (req, res) => {
    const sql = `SELECT * FROM users ORDER BY user_id DESC`;
    await db
      .any(sql)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        throw err;
      });
  });

  // edit user data
  app.put(`/api/user/update`, async (req, res) => {
    const { id, account, password, hashedPassword, fullname, point } = req.body;

    const sqlCheck = `SELECT * FROM users WHERE user_id = $1`;
    const dataUser = await db
      .oneOrNone(sqlCheck, [id])
      .then((data) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });

    const pass =
      dataUser?.user_password === password ? password : hashedPassword;

    const sql = `
          UPDATE users
          SET
              user_account = $1,
              user_password = $2,
              user_fullname = $3,
              user_point = $4
          WHERE user_id = $5
      `;
    await db
      .any(sql, [account, pass, fullname, point, id])
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        throw err;
      });
  });

  // delete user data by id
  app.put(`/api/user/delete/:id`, async (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM users WHERE user_id = $1`;
    await db
      .any(sql, [id])
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        throw err;
      });
  });
};

module.exports = api;
