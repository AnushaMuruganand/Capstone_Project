import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import Alert from "../common/Alert";
import "./WeatherSignUpForm.css"

/** Signup form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls signup function prop
 * - redirects to /weather route
 *
 * Routes -> SignupForm -> Alert
 * Routed as /signup
 */

function WeatherSignupForm({ signup }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
      "SignupForm",
      "signup=", typeof signup,
      "formData=", formData,
      "formErrors=", formErrors,
  );

  /** Handle form submit:
   *
   * Calls signup func prop and, if successful, redirect to /weather.
   */

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await signup(formData);
    if (result.success) {
      history.push("/weather");
    } else {
      setFormErrors(result.errors);
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  return (
    <div className="SignupForm">
      <Helmet bodyAttributes={{style: 'background : url("https://images.pexels.com/photos/635279/pexels-photo-635279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"); background-size:cover'}}/>
        <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <h1 className="SignupForm-title m-5">SIGN-UP</h1>
          <div className="SignupForm-card">
            <div>
              <form onSubmit={handleSubmit}>
                <div className="">
                  <label className="">Username</label>
                  <input
                      name="username"
                      className="form-control"
                      value={formData.username}
                      onChange={handleChange}
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
                  />
                </div>

                <div className="form-group">
                  <label>First name</label>
                  <input
                      name="firstName"
                      className="form-control"
                      value={formData.firstName}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Last name</label>
                  <input
                      name="lastName"
                      className="form-control"
                      value={formData.lastName}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                  />
                </div>

                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null
                }

                <button
                    type="submit"
                    className="SignupForm-button float-right"
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

export default WeatherSignupForm;