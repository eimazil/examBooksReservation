const express = require("express");
const app = express();
const port = 3003;
app.use(express.json({ limit: "10mb" }));
const cors = require("cors");
app.use(cors());
const md5 = require("js-md5");
const uuid = require("uuid");
const mysql = require("mysql");
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "exam_database",
});

////////////////////LOGIN/////////////////

const doAuth = function (req, res, next) {
  if (0 === req.url.indexOf("/server")) {
    // admin
    const sql = `
        SELECT
        name, role
        FROM users
        WHERE session = ?
    `;
    con.query(sql, [req.headers["authorization"] || ""], (err, results) => {
      if (err) throw err;
      if (!results.length || results[0].role !== 10) {
        res.status(401).send({});
        req.connection.destroy();
      } else {
        next();
      }
    });
  } else if (
    0 === req.url.indexOf("/login-check") ||
    0 === req.url.indexOf("/login") ||
    0 === req.url.indexOf("/register")
  ) {
    next();
  } else {
    // fron
    const sql = `
        SELECT
        name, role
        FROM users
        WHERE session = ?
    `;
    con.query(sql, [req.headers["authorization"] || ""], (err, results) => {
      if (err) throw err;
      if (!results.length) {
        res.status(401).send({});
        req.connection.destroy();
      } else {
        next();
      }
    });
  }
};

app.use(doAuth);

// AUTH
app.get("/login-check", (req, res) => {
  const sql = `
         SELECT
         name, role
         FROM users
         WHERE session = ?
        `;
  con.query(sql, [req.headers["authorization"] || ""], (err, result) => {
    if (err) throw err;
    if (!result.length) {
      res.send({ msg: "error", status: 1 }); // user not logged
    } else {
      if ("admin" === req.query.role) {
        if (result[0].role !== 10) {
          res.send({ msg: "error", status: 2 }); // not an admin
        } else {
          res.send({ msg: "ok", status: 3 }); // is admin
        }
      } else {
        res.send({ msg: "ok", status: 4 }); // is user
      }
    }
  });
});

app.post("/login", (req, res) => {
  const key = uuid.v4();
  const sql = `
    UPDATE users
    SET session = ?
    WHERE name = ? AND psw = ?
  `;
  con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
    if (err) throw err;
    if (!result.affectedRows) {
      res.send({ msg: "error", key: "" });
    } else {
      res.send({ msg: "ok", key });
    }
  });
});

app.get("/login/:session", (req, res) => {
  const sql = `
         SELECT id
         FROM users
         WHERE session = ?
    `;
  con.query(sql, [req.params.session], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/register", (req, res) => {
  const sql = `
    INSERT INTO users (name, psw)
    VALUES (?, ?)
  `;
  con.query(sql, [req.body.name, md5(req.body.pass)], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

///////////////////END////////////////////

// Books CRUD
// CREATE
app.post("/books", (req, res) => {
  const sql = `
    INSERT INTO books (title, author, description, category_id, image)
    VALUES (?, ?, ?, ?, ?)
    `;
  con.query(
    sql,
    [
      req.body.title,
      req.body.author,
      req.body.description,
      req.body.category_id,
      req.body.image,
    ],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});
// READ

app.get("/books", (req, res) => {
  const sql = `
    SELECT b.*, c.title as category_title, u.name as user_name
    FROM books AS b
    INNER JOIN categories AS c
    ON b.category_id = c.id
    LEFT JOIN users AS u
    ON b.user_id = u.id
    ORDER BY b.id
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// EDIT
app.put("/books/:id", (req, res) => {
  let sql;
  let r;
  if (req.body.deletePhoto) {
    sql = `
        UPDATE books
        SET title = ?, author = ?, description = ?, category_id = ?, image = null
        WHERE id = ?
        `;
    r = [
      req.body.title,
      req.body.author,
      req.body.description,
      req.body.category_id,
      req.params.id,
    ];
  } else if (req.body.image) {
    sql = `
        UPDATE books
        SET  title = ?, author = ?, description = ?, category_id = ?, image = ?
        WHERE id = ?
        `;
    r = [
      req.body.title,
      req.body.author,
      req.body.description,
      req.body.category_id,
      req.body.image,
      req.params.id,
    ];
  } else {
    sql = `
        UPDATE books
        SET  title = ?, author = ?, description = ?, category_id = ?
        WHERE id = ?
        `;
    r = [
      req.body.title,
      req.body.author,
      req.body.description,
      req.body.category_id,
      req.params.id,
    ];
  }
  con.query(sql, r, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Delete
app.delete("/books/:id", (req, res) => {
  const sql = `
    DELETE FROM books
    WHERE id = ?
    `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.put("/return/books/:id", (req, res) => {
  const sql = `
    UPDATE books
    SET user_id =?, return_date = ?, extensions = ?
    WHERE id = ?
    `;
  con.query(
    sql,
    [
      req.body.user_id,
      req.body.return_date,
      req.body.extensions,
      req.params.id,
    ],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

// Categories CRUD
// CREATE
app.post("/categories", (req, res) => {
  const sql = `
    INSERT INTO categories (title)
    VALUES (?)
    `;
  con.query(sql, [req.body.title, req.body.image], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
// READ

app.get("/categories", (req, res) => {
  const sql = `
    SELECT *
    FROM categories
    ORDER BY id DESC
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// EDIT
app.put("/categories/:id", (req, res) => {
  const sql = `
    UPDATE categories
    SET title = ?
    WHERE id = ?
    `;
  con.query(sql, [req.body.title, req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Delete
app.delete("/categories/:id", (req, res) => {
  const sql = `
    DELETE FROM categories
    WHERE id = ?
    `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Home

app.get("/home/books", (req, res) => {
  const sql = `
    SELECT b.*, c.title as category_title, u.name as user_name
    FROM books AS b
    INNER JOIN categories AS c
    ON b.category_id = c.id
    LEFT JOIN users AS u
    ON b.user_id = u.id
    WHERE b.user_id = 1
    ORDER BY b.id
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.put("/reserve/books/:id", (req, res) => {
  const sql = `
    UPDATE books
    SET user_id =?, return_date = ?
    WHERE id = ?
    `;
  con.query(
    sql,
    [req.body.user_id, req.body.return_date, req.params.id],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.get("/mybooks/:id", (req, res) => {
  const sql = `
    SELECT b.*, c.title as category_title, u.name as user_name
    FROM books AS b
    INNER JOIN categories AS c
    ON b.category_id = c.id
    LEFT JOIN users AS u
    ON b.user_id = u.id
    WHERE b.user_id = ?
    ORDER BY b.id
    `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.put("/extendReservation/:id", (req, res) => {
  const sql = `
    UPDATE books
    SET  
    return_date = ?,
    extensions = extensions + 1
    WHERE id = ?
    `;
  con.query(sql, [req.body.return_date, req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.all("*", (req, res) => {
  res.status(404).send();
});

app.listen(port, () => {
  console.log(` ${port} port!`);
});
