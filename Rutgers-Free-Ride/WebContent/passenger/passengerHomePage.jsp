<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<link rel="stylesheet" type="text/css" href="../css/login.css">


<title>Rutgers Free Ride</title>
</head>
<body>

	<p class="app-name"> Rutgers Free Ride! </p>      

	
	<div class="passenger-home-page">
	
		<div class="form">
			<%
				String user_name = session.getAttribute("user_name").toString();
			    String user_email = session.getAttribute("user_email").toString();
				out.print( "<p class='message' > Welcome! Dear " + user_name + "</p>");
			%>
			<p class="message">You are now log in as a passenger. Log out please <a href="../login.jsp">click here</a></p>
			
			<p class="message-red">Operations</p>
			<form>
			
				<button formaction='postRequest.jsp'> Post a new request </button>
				<br /><br />
				<button formaction='currentActivatedRequest.jsp'> Current activated requests </button>
				<br /><br />
				<button formaction='recurringRequest.jsp'> Recurring requests </button>
				<br /><br />
				<button formaction='RequestHistory.jsp'> History Rides </button>
				<br /><br />
				<button formaction='postOffer.jsp'> my account info </button>	
			</form>
			
		</div>
	</div>
</body>
</html>