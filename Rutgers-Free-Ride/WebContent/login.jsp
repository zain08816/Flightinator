<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ page import="java.io.*,java.util.*,java.sql.*"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*" %>

<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" type="text/css" href="css/login.css">

<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Rutgers Free Ride</title>

</head>
<body>

<%
session.setAttribute("user_name", "");
session.setAttribute("user_email", "");
%>

<p class="app-name"> Rutgers Free Ride! </p>      

<div class="login-page">
  <div class="form">
    <form class="register-form" method="post" action="newUser.jsp">
      
      <input type="text" placeholder="nick name" name="user_name"/>
      
      <input type="password" placeholder="password" name="password"/>
      
      <input type="email" placeholder="rutgers email" name="ru_email"/>
      
      <button>create</button>
      
      <p class="message">Already registered? <a href="#">Sign In</a></p>
    </form>
    
    <form class="login-form" method="post" action="checkUser.jsp">
      <input type="email" placeholder="rutgers email" name="ru_email"/>
      <input type="password" placeholder="password" name="password"/>
      <button>login</button>
      <p class="message">Not registered? <a href="#">Create an account</a></p>
      <p class="message">Admin or System support? <a href="admin-syssup/asLogin.jsp">Please log in here</a></p>
      
    </form>
     
  </div>
</div>

<script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
<script type="text/javascript">
$(document).ready(function(){
	if (window.location.href.indexOf('signup')!=-1){
		$('.login-form').hide();
		$('.register-form').show();
	}
});

$('.message a').click(function(){
	   $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
	});
</script>

</body>
</html>