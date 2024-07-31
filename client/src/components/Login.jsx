import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [signUpForm, setSignUpForm] = useState(false);
  const [forgotPasswordForm, setForgotPasswordForm] = useState(false);
  const navigate = useNavigate();

  const toggleForm = () => {
    setSignUpForm(!signUpForm);
    if(forgotPasswordForm){
      setForgotPasswordForm(!forgotPasswordForm)
    }
  };

  const toggleForgotPasswordForm = () => {
    setForgotPasswordForm(!forgotPasswordForm);
  };


  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        let url = "";
        if(forgotPasswordForm){
          url =`http://localhost:3000/api/v1/forgot`
        }else if(signUpForm){
          url=`http://localhost:3000/api/v1/signup`
        }else{
          url = `http://localhost:3000/api/v1/login`
        }
        const response = await fetch(url,{
          method:"POST",
          headers:{
            "Content-Type": "application/json",
          },
          body:JSON.stringify(forgotPasswordForm ? { email: values.email } : values),
        })

        const responseData = await response.json();
        console.log(responseData)
        if (forgotPasswordForm && responseData.resetToken.token) {
          navigate(`/reset-password/${responseData.resetToken.token}`);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <>
      <div className="flex justify-center items-center ml-40 mr-40 pt-30 pb-30 mt-40">
        <div
          className={`flex flex-col justify-center bg-slate-500 w-72 ${
            signUpForm ? "h-96" : "h-80"
          }  rounded-lg shadow-lg shadow-gray-700`}
        >
          {forgotPasswordForm ? (
            <p className="pl-20 text-xl font-semibold pr-8 bottom-6 relative">Forgot Password</p>
          ) : signUpForm ? (
            <p className="pl-28 text-xl font-semibold">Sign Up</p>
          ) : (
            <p className="pl-28 text-xl font-semibold">Login</p>
          )}

          <form
            onSubmit={formik.handleSubmit}
            class="flex flex-col  gap-2 pl-4 pr-4"
          >
            {signUpForm ? (
              <>
                <label className=" text-xl" htmlFor="name">
                  Name
                </label>
                <input
                  className="p-2 rounded-md"
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
              </>
            ) : (
              ""
            )}
            <label className=" text-xl" htmlFor="email">
              Email
            </label>
            <input
              className="p-2 rounded-md"
              id="email"
              type="email"
              placeholder="Enter your email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {!forgotPasswordForm ? (<>
              <label className="text-xl" htmlFor="password">
              Password
            </label>
            <input
              className="p-2 rounded-md"
              id="password"
              placeholder="Enter your password"
              onChange={formik.handleChange}
              value={formik.values.password}
              type="password"
            />
            </>):("")}
           
            <button
              className="bg-red-500 hover:bg-red-700 text-rose-100 p-2 mt-4 rounded-md text-xl "
              type="submit"
            >
              Submit
            </button>
          </form>
          {!forgotPasswordForm && signUpForm ? (
            <p className="pl-4">
              Already have account ?{" "}
              <a onClick={toggleForm} className="cursor-pointer text-blue-800">
                Login
              </a>
            </p>
          ) : (
            <>
              <p className="pl-4">
                Don't have account ?{" "}
                <a
                  onClick={toggleForm}
                  className="cursor-pointer text-blue-800"
                >
                  Sign Up
                </a>
              </p>
              {
                !forgotPasswordForm ? (<p onClick={toggleForgotPasswordForm} className="pl-4 text-blue-800 cursor-pointer">
                  Fogot Password ?{" "}
                </p>):("")
              }
              
              {/* <p onClick={forgotPasswordForm}>Forgot Password ?</p> */}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
