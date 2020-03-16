<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ page import="java.io.*,java.util.*,java.sql.*"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link rel="stylesheet" type="text/css" href="../css/login.css">

<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Rutgers Free Ride</title>

</head>
<body>

<p class="app-name"> Rutgers Free Ride!</p>      
<p class="app-name"> Manage board</p>      

<div class="login-page">
  <div class="form">
    
    <form class="login-form" method="post" action="asCheckUser.jsp">
      <input type="text" placeholder="account name" name="user_name"/>
      <input type="password" placeholder="password" name="password"/>
      <button>login</button>
      <p class="message">An ordinary user?<a href="../login.jsp"> Please log in here</a></p>
      
    </form>
    
  </div>
</div>


</body>
</html>