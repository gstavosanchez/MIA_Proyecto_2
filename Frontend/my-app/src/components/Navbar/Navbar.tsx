import React, { Fragment, useContext } from "react";
import { UserContext } from "../../context/user/UserContext";
import { NavbarAdmin } from './NavbarAdmin'
import { NavbarClient } from './NavbarClient'
import { NavbarLogin } from './NavbarLogin'
export const Navbar = () => {
  const { isLogged, tipoID } = useContext(
    UserContext
  );

  return (
    <>
      {isLogged === false && (<NavbarLogin />)}
      {tipoID === 1 && (<NavbarClient />)}
      {tipoID === 2 && (<NavbarAdmin />)}
    </>
  );
};
