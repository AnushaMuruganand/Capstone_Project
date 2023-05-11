import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import Alert from "../common/Alert";
import "./WeatherLoginForm.css"

/** Login form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls login function prop
 * - redirects to /weather route
 *
 * Routes -> LoginForm -> Alert
 * Routed as /login
 */

function WeatherLoginForm({ login }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
      "LoginForm",
      "login=", typeof login,
      "formData=", formData,
      "formErrors", formErrors,
  );

  /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to /weather.
   */

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await login(formData);
    if (result.success) {
      history.push("/weather");
    } else {
      setFormErrors(result.errors);
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(l => ({ ...l, [name]: value }));
  }

  return (
    <div className="LoginForm">
      <Helmet bodyAttributes={{style: 'background: url("https://i.gifer.com/1PSm.gif"); background-size:cover'}}/>
        <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <h1 className="LoginForm-title m-5">LOGIN</h1>

          <div className="LoginForm-card">
            <div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Username</label>
                  <input
                      name="username"
                      className="form-control"
                      value={formData.username}
                      onChange={handleChange}
                      autoComplete="username"
                      required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="current-password"
                      required
                  />
                </div>

                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null}

                <button
                    className="LoginForm-button float-right"
                    onSubmit={handleSubmit}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}

export default WeatherLoginForm;
