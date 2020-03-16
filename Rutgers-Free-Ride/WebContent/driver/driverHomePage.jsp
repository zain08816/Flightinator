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
		
	<div class="driver-home-page">
		<div class="form">
		<%
			String user_name = session.getAttribute("user_name").toString();
	    	String user_email = session.getAttribute("user_email").toString();
			out.print( "<p class='message' > welcome! Dear " + user_name + "</p>");
		%>
		<p class="message">You are now log in as a driver. Log out please <a href="../login.jsp">click here</a></p>
		
			<p class="message-red">Operations</p>
			<form>
			
				<button formaction='postOffer.jsp'> Post Offer </button>
				<br /><br />
				<button formaction='driverWaitingPage.jsp'> Current Offer Waiting Page </button>
				<br /><br />
				<button formaction='recurringOffer.jsp'> recurring Offers </button>
				<br /><br />
				<button formaction='showReward.jsp'> my rewards </button>	
				<br /><br />
				<button formaction='car/manageCarList.jsp'> my Car List </button>
				<br /><br />
				<button formaction='offerHistory.jsp'> History </button>
					
			</form>
		</div>
	</div>
</body>
</html>