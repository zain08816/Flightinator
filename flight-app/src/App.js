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
  const [isAdmin, setAdmin] = useState(false);
  const cookies = new Cookies();
  


  // function updateUser(newUser) {
  //   setUser(newUser)
  // }

  useEffect(() => {
    onLoad();
  }, []);

  function onLoad() {

    if(cookies.get('username')) {
      if(cookies.get('username') == "admin") setAdmin(true);
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

  function renderLoggedIn(){
    return(
          <>
            <LinkContainer to="/profile">
              <NavItem>{user}'s Profile</NavItem>
            </LinkContainer>
            <NavItem onClick={handleLogout}>Logout</NavItem>
            <LinkContainer to="/control">
              <NavItem>Search Flight</NavItem>
            </LinkContainer>
            <LinkContainer to ="/reserve">
              <NavItem> Reserve Flight </NavItem>
            </LinkContainer>
            <LinkContainer to ="/myreservations">
              <NavItem> My Reservations </NavItem>
            </LinkContainer>
            <LinkContainer to ="/myitinerary">
              <NavItem> My Itinerary </NavItem>
            </LinkContainer>
            <LinkContainer to="/covid">
              <NavItem>COVID-19 Info</NavItem>
            </LinkContainer>
          </>

    );
  }

  function renderNotLoggedIn(){
    return(
          <>
            <LinkContainer to="/signup">
              <NavItem>Signup</NavItem>
            </LinkContainer>
            <LinkContainer to="/login">
              <NavItem>Login</NavItem>
            </LinkContainer>
            <LinkContainer to="/covid">
              <NavItem>COVID-19 Info</NavItem>
            </LinkContainer>
          </>
    );
  }

  function renderAdmin(){

    return(
          <>
            <LinkContainer to="/admin">
              <NavItem>Admin Controls</NavItem>
            </LinkContainer>
            
            <NavItem onClick={handleLogout}>Logout</NavItem>
            <LinkContainer to="/control">
              <NavItem>Search Flight</NavItem>
            </LinkContainer>
            <LinkContainer to ="/customer">
              <NavItem> Edit Customer Info </NavItem>
            </LinkContainer>
            <LinkContainer to ="/salesreport">
              <NavItem> Get Sales Reports </NavItem>
            </LinkContainer>
            <LinkContainer to ="/flightsList">
              <NavItem> Get List of all Flights </NavItem>
            </LinkContainer>
            <LinkContainer to ="/reservationList">
              <NavItem> List of Reservations </NavItem>
            </LinkContainer>
            <LinkContainer to ="/revenue">
              <NavItem> Lookup Revenue Generated </NavItem>
            </LinkContainer>
            <LinkContainer to ="/customerreservation">
              <NavItem> Customer Reservation List </NavItem>
            </LinkContainer>
            <LinkContainer to ="/mostBooked">
              <NavItem> Find the Most Active Flight </NavItem>
            </LinkContainer>
            <LinkContainer to ="/topcustomer">
              <NavItem> Find Top Customer </NavItem>
            </LinkContainer>
          </>
    );
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
          {
            isAuthenticated ? 
            isAdmin? renderAdmin() : renderLoggedIn() : 
            renderNotLoggedIn()
          }
        </Nav>
      </Navbar>
      <Routes appProps={{ isAuthenticated, userHasAuthenticated, user, setUser, setAdmin }} />
    </div>
  );
}

export default App;