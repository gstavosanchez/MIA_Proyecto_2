import React, { Fragment, useCallback, useContext, useEffect } from "react";
import { UserContext } from "../../context/user/UserContext";
import { getLocalTipo, getLocalUser } from "../../services/UserService";
import { NavbarAdmin } from './NavbarAdmin'
import { NavbarClient } from './NavbarClient'
import { NavbarLogin } from './NavbarLogin'
export const Navbar = () => {
  const { userID,isLogged, tipoID,setID,setLogged,setTipo } = useContext(
    UserContext
  );

 
  const statusLogin = useCallback(() => {
    if(!isLogged && userID === 0 && getLocalUser()!== "" && getLocalTipo() !== ""){
      setID(Number(getLocalUser()))
      setLogged(true)
      setTipo(Number(getLocalTipo()))
    }
  },[setID,setLogged,setTipo,isLogged,userID])
  
   useEffect(() => {
    statusLogin()
  }, [statusLogin])
  


  return (
    <>
      {isLogged === false && (<NavbarLogin />)}
      {tipoID === 1 && (<NavbarClient />)}
      {tipoID === 2 && (<NavbarAdmin />)}
    </>
  );
};
