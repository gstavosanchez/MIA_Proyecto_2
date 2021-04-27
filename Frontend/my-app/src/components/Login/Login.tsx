import React, { ChangeEvent, FormEvent, useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { ILogin } from "../../models/Login";
import { IUser } from "../../models/User";
import * as userService from '../../services/UserService'

type InputChange = ChangeEvent<HTMLInputElement>;
export const Login = () => {
  const history =  useHistory()
  const initialState: ILogin = {
    UserName: "",
    Password: "",
  };
  const [user, setUser] = useState<ILogin>(initialState);
  const handleInputChange = (e: InputChange) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await userService.signIn(user);
    if(res.data){
      const users:IUser[] = res.data;
      if(users.length === 1){
        setUser(initialState)
        history.push("/dashboard");
        toast.success("Login Succes")
        return
      }else{
        toast.error("User o Password invalid")
        setUser(initialState)
      }

    }
   

  };
  return (
    <div className="col-md-6 offset-md-3">
      <br />
      <br />
      <div className="card border-light">
        <img
          src="https://www.flaticon.es/svg/static/icons/svg/648/648393.svg"
          alt=""
          className="rounded mx-auto d-block"
          style={{ width: 200, height: 200 }}
        />
        <br />
        <div className="card card-boyd">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="User Name"
                className="form-control"
                name="UserName"
                onChange={handleInputChange}
                value={user.UserName}
                autoFocus
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                name="Password"
                onChange={handleInputChange}
                value={user.Password}
                required
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                Sing In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
