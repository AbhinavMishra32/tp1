// import { FloatingLabel } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
// import { Label } from 'react-router-dom';

export default function SignUp() {

  const [formData, setFormData] = React.useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
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
          <p className="text-sm mt-8">
            This is a blog website where you can read blogs about various topics. You can also write your own blogs and share them with the world.
          </p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label>Your username</Label>
              <TextInput type="text" placeholder="Username" id="username" onChange={handleChange} />
            </div>
            <div>
              <Label>Your email</Label>
              <TextInput type="email" placeholder="name@company.com" id="email" onChange={handleChange} />
            </div>
            <div>
              <Label>Your password</Label>
              <TextInput type="password" placeholder="Password" id="password" onChange={handleChange} />
            </div>
            <Button gradientDuoTone='purpleToPink' type="submit" className="transition-color">
              Sign Up
            </Button>
            <div className="flex gap-2 text-sm mt-1">
              <span>Have an account?</span>
              <Link to="/sign-in" className='text-blue-500'>Sign In</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
