"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Related functions for users. */

class User {

  /** authenticate user with username, password.
   *
   * Returns { username, first_name, last_name, email}
   *
   * Throws UnauthorizedError if user not found or wrong password.
   **/
  static async authenticate(username, password) {
    // try to find the user first
    // const result = await db.query(
    //       `SELECT username,
    //               password,
    //               first_name AS "firstName",
    //               last_name AS "lastName",
    //               email
    //        FROM users
    //        WHERE username = $1`,
    //     [username],
    // );

    const result = await db.select("username", "password", "firstName", "lastName", "email").from("users").where("username", `${username}`);

    const user = result.rows[0];

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  /** Register user with data.
   *
   * Returns { username, firstName, lastName, email }
   *
   * Throws BadRequestError on duplicates.
   **/

  static async register(
      { username, password, firstName, lastName, email}) {
    // const duplicateCheck = await db.query(
    //       `SELECT username
    //        FROM users
    //        WHERE username = $1`,
    //     [username],
    // );

    const duplicateCheck = await db.select("username").from("users").where("username", `${username}`);

    console.log("DUPLICATE CHECK :", duplicateCheck);

    if (duplicateCheck.length!==0) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    // const result = await db.query(
    //       `INSERT INTO users
    //        (username,
    //         password,
    //         first_name,
    //         last_name,
    //         email)
    //        VALUES ($1, $2, $3, $4, $5)
    //        RETURNING username, first_name AS "firstName", last_name AS "lastName", email`,
    //     [
    //       username,
    //       hashedPassword,
    //       firstName,
    //       lastName,
    //       email,
    //     ],
    // );

    const result = await db("users").insert({
      username: `${username}`,
      password: `${hashedPassword}`,
      firstName: `${firstName}`,
      lastName: `${lastName}`,
      email: `${email}`
    }).returning("username", "firstName", "lastName", "email");

    console.log("SAVED USER :", result);

    const user = result.rows[0];

    return user;
  }

  /** Given a username, return data about user.
   *
   * Returns { username, first_name, last_name }
   *
   * Throws NotFoundError if user not found.
   **/

  static async get(username) {
    // const userRes = await db.query(
    //       `SELECT username,
    //               first_name AS "firstName",
    //               last_name AS "lastName",
    //               email
    //        FROM users
    //        WHERE username = $1`,
    //     [username],
    // );

    const userRes = await db.select("username", "firstName", "lastName", "email").from("users").where("username", `${username}`);

    console.log("RESULT :", userRes);

    const user = userRes.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);
    return user;
  }
}

module.exports = User;
