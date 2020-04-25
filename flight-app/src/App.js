import React, { useState, useEffect } from "react";
import "./App.css";
import Routes from "./Routes";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Cookies from 'universal-cookie'
import { get } from "https";


function App(props) {

  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [user, setUser] = useState("");
  const cookies = new Cookies();
  


  // function updateUser(newUser) {
  //   setUser(newUser)
  // }

  useEffect(() => {
    onLoad();
  }, []);

  function onLoad() {

    if(cookies.get('username')) {
      userHasAuthenticated(true);
      setIsAuthenticating(false);
      setUser(cookies.get('username'));
    } else {
      userHasAuthenticated(false);
      setIsAuthenticating(false);
    }
      
  }


  function handleLogout() {
    cookies.set('username', "", { path: '/'})
    setIsAuthenticating(false);
    userHasAuthenticated(false);

  }




  return (
    !isAuthenticating &&
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Flightinator</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          {isAuthenticated
            ? <>
              <NavItem>{user}'s Profile</NavItem>
              <NavItem onClick={handleLogout}>Logout</NavItem>
              <LinkContainer to="/control">
                <NavItem>Search Flight</NavItem>
              </LinkContainer>
              <LinkContainer to ="/reserve">
                <NavItem> Reserve Flight </NavItem>
              </LinkContainer>
            </>
            : <>
              <LinkContainer to="/signup">
                <NavItem>Signup</NavItem>
              </LinkContainer>
              <LinkContainer to="/login">
                <NavItem>Login</NavItem>
              </LinkContainer>
            </>
          }
        </Nav>
      </Navbar>
      <Routes appProps={{ isAuthenticated, userHasAuthenticated, user, setUser }} />
    </div>
  );
}

export default App;