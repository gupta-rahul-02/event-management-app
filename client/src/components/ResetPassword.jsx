import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [tokenValid, setTokenValid] = useState(false);
//   useEffect(() => {
//     const verifyToken = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:3000/api/v1/reset-password/${token}`
//         );
//         console.log(response);
//         if (response.ok) {
//           setTokenValid(true);
//         } else {
//           setTokenValid(false);
//         }
//       } catch (error) {
//         console.log(error);
//         setTokenValid(false);
//       }
//     };
//     verifyToken();
//   }, [token]);
  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      if (values.newPassword !== values.confirmPassword) {
        alert("Password does not match");
        return;
      }
      try {
        const response = await fetch(`http://localhost:3000/api/v1/reset-password/${token}`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                newPassword: values.newPassword,
                confirmPassword: values.confirmPassword,
              }),
        });
        if(response.ok){
            alert("Password reset successfully");
            navigate("/");
        }else{
            alert("Failed to reset password");
        }
      } catch (error) {
        console.log(error)
      }
    },
  });

//   if(!tokenValid){
//     return <div>Invalid or expired token</div>
//   }
  return (
    <div className="flex justify-center items-center mt-40">
        <div className="flex flex-col gap-4 justify-center items-center bg-slate-500 w-72 pt-4 rounded-lg">
      <p className="text-xl font-semibold">Reset Password</p>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
        <label htmlFor="newPassword" className="pl-2 text-xl">New Password</label>
        <input
        className="p-2 rounded-md"
          type="password"
          id="newPassword"
          placeholder="Enter your new password"
          onChange={formik.handleChange}
          value={formik.values.newPassword}
        />
        <label className="pl-2 text-xl">Confirm Password</label>
        <input
        className="p-2 rounded-md"
          type="password"
          id="confirmPassword"
          placeholder="Confirm your password"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
        />
        <button className="bg-orange-400 rounded-md mb-2 p-1 mt-3" type="submit">Reset Password</button>
      </form>
    </div>
    </div>
  );
};

export default ResetPassword;
