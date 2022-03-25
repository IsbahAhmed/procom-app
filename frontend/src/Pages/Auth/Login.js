import { Formik, Form, Field } from "formik";
import React, { useState } from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import StyledButton from "../../Components/StyledButton/StyledButton";
import StyledInput from "../../Components/StyledInput/StyledInput";
import { signin } from "../../Redux/user/userActions";
import {toast} from "react-toastify"
import { Link } from "react-router-dom";
const Login = ({signin}) => {
    const [loading,setLoading] = useState(false)
  const schema = Yup.object().shape({
    email: Yup.string()
      .max(200, "Maximum 200 letters")
      .email()
      .required("Email is required"),
    password: Yup.string().max(16).required("Password is required"),
  });
  
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{}}
      validationSchema={schema}
      onSubmit={(values) => {
        setLoading(true)
        signin(values).then((res)=> {
            setLoading(false)
            if(res){
              window.location.reload()
            }
            else{
                toast.error("Sigin Failed")
            }
        })
      }}
    >
      {({
        handleSubmit,
        values,
        handleChange
      }) => (
        <>
          <Form className="form form-label-right container-fluid">
            <div className="form-group row">
              {/* First Name */}
              <div className="col-lg-12 mt-4">
                <StyledInput
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                />
              </div>
              <div className="col-lg-12 mt-4">
                <StyledInput
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                />
              </div>
              <div className="col-md-12 mt-4">
                Not a member?{" "}
                <Link to="/auth#signup">
                  {" "}
                  <span className="text-primary">Sign up</span>
                </Link>
              </div>
            </div>
            <StyledButton
              varient="primary"
              value="SUBMIT"
              className="mx-auto mt-4"
              onClick={() => {
                handleSubmit();
              }}
              loading={loading}
              type="button"
            />
            {/* Email */}
          </Form>
        </>
      )}
    </Formik>
  );
};

export default connect(null,{signin})(Login);
