import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();

  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    if (ref.current.src.includes("/eye.jpg")) {
      ref.current.src = "/eyecross.jpg";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "/eye.jpg";
      passwordRef.current.type = "password";
    }
  };

  const savePassword = () => {
    if (form.site.length > 1 && form.username.length > 1 && form.password.length > 1) {
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      console.log([...passwordArray, { ...form, id: uuidv4() }]);
      setform({ site: "", username: "", password: "" });
      toast.success("Saved Successful!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.error("All Field Requred!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  const deletePassword = (id) => {
    console.log("deleting password", id);
    let c = confirm("Do you want to delete the password?");
    if (c) {
      setpasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );
    }
    toast.success("Password Deleted!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const editPassword = (id) => {
    console.log("editing password", id);
    setform(passwordArray.filter((item) => item.id === id)[0]);
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handelChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (item) => {
    toast.success("Copied to clipboard!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(item);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="bg bg-blue-100 min-h-screen pt-14">
        <div className=" md:container md:px-40 md:py-16 md:mx-auto">
          <div className="logo font-bold text-3xl text-center">
            <span className="text-blue-500 ">&lt;</span>
            Safe
            <span className="text-blue-500">Haven/&gt;</span>
          </div>
          <p className="text-center">Your Own Passowrd Manager</p>

          <div className="flex flex-col p-4 text-black gap-8 items-center">
            <input
              value={form.site}
              onChange={handelChange}
              className="rounded-full border border-blue-500 w-full p-4 py-1 "
              placeholder="Enter Site or URL"
              type="text"
              name="site"
            />
            <div className="flex gap-8 w-full">
              <input
                value={form.username}
                onChange={handelChange}
                className="rounded-full border border-blue-500 w-full p-4 py-1 "
                placeholder="Enter Username"
                type="text"
                name="username"
              />
              <div className="relative">
                <input
                  ref={passwordRef}
                  value={form.password}
                  onChange={handelChange}
                  className="rounded-full border border-blue-500 w-full p-4 py-1 "
                  placeholder="Enter Password"
                  type="password"
                  name="password"
                />
                <span
                  className="absolute right-2 top-2 cursor-pointer"
                  onClick={showPassword}
                >
                  <img ref={ref} width={25} src="/eye.jpg" alt="eye" />
                </span>
              </div>
            </div>
            <button
              onClick={savePassword}
              className=" flex justify-center items-center bg-blue-400  border hover:bg-blue-300 w-fit rounded-full p-2 px-8"
            >
              Save
            </button>
          </div>
          <h2 className="font-bold p-4">Your Passwords</h2>
          {passwordArray.length === 0 && (
            <div className="text-red-600">No passwords to show</div>
          )}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-lg overflow-hidden">
              <thead className="bg-blue-800 text-white">
                <tr>
                  <th>Sites</th>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="bg-blue-200">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center w-32 p-3">
                        <div className="flex justify-center items-center gap-2">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <img
                            className="cursor-pointer"
                            src="/copy.jpg"
                            alt="copy"
                            width={18}
                            onClick={() => {
                              copyText(item.site);
                            }}
                          />
                        </div>
                      </td>
                      <td className="text-center w-32 p-3">
                        <div className="flex justify-center items-center gap-2">
                          {item.username}
                          <img
                            className="cursor-pointer"
                            src="/copy.jpg"
                            alt="copy"
                            width={18}
                            onClick={() => {
                              copyText(item.username);
                            }}
                          />
                        </div>
                      </td>
                      <td className="text-center w-32 p-3">
                        <div className="flex justify-center items-center gap-2">
                          {item.password}
                          <img
                            className="cursor-pointer"
                            src="/copy.jpg"
                            alt="copy"
                            width={18}
                            onClick={() => {
                              copyText(item.password);
                            }}
                          />
                        </div>
                      </td>
                      <td className="text-center w-32 p-3">
                        <div className="flex justify-center items-center gap-8">
                          <img
                            onClick={() => {
                              editPassword(item.id);
                            }}
                            className="cursor-pointer"
                            src="/edit.png"
                            alt="edit"
                            width={21}
                          />
                          <img
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                            className="cursor-pointer"
                            src="/delete.png"
                            alt="delete"
                            width={21}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
export default Manager;
