import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Checkbox, Label, TextInput, Alert, Spinner } from "flowbite-react";
import { HiInformationCircle } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = React.useState({});
  // const [errorMessage, setErrorMessage] = React.useState(null);
  // const [loading, setLoading] = React.useState(false);
  const { loading, error: errorMessage } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill all the fields"));
      // return setErrorMessage("Please fill all the fields");
    }
    try {
      // setErrorMessage(null);
      // setLoading(true);
      dispatch(signInStart()); // this is setting the global state to loading, so that we can show spinner.
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!data.success) {
        // setErrorMessage(data.message);
        dispatch(signInFailure(data.message));
        console.log("signInFailure dispatch from !data.success: ", data.message);
        console.log(data);
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
      // setLoading(false);
      // dispatch(signInSuccess(data.user));
    } catch (error) {
      // setErrorMessage(error.message);
      dispatch(signInFailure(error.message));
      console.log("signInFailure dispatch from catch block: ", error.message);
      console.log(error);
      // setLoading(false);

    }
  }

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg mr-1 text-white shadow-gray-400 shadow-sm-light">Abhinav's</span>
            Blog
          </Link>
          <p className="text-lg mt-8 font-bold text-gray-600">
            Welcome back! Please sign in to your account.
          </p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label>Your email</Label>
              <TextInput type="email" placeholder="name@company.com" id="email" onChange={handleChange} />
            </div>
            <div>
              <Label>Your password</Label>
              <TextInput type="password" placeholder="Password" id="password" onChange={handleChange} />
            </div>
            <Button gradientDuoTone='purpleToPink' type="submit" className="transition-color" disabled={loading}>
              {
                loading ? (
                  <>
                    <Spinner size='sm' />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : "Sign In"
              }
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-4">
            <span>Don't have an account?</span>
            <Link to="/signup" className='text-blue-500'>Sign Up</Link>
          </div>
          {errorMessage && (
            <div className="">
              <Alert className="mt-2" icon={HiInformationCircle} color="failure">{errorMessage}</Alert>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
