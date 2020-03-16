<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ page import="java.io.*,java.util.*, java.sql.*, javax.mail.* "%>
<%@ page import="javax.mail.internet.*, javax.activation.*, javax.mail.Session, javax.mail.Transport "%>

<%@ page import="javax.servlet.http.*,javax.servlet.* "%>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta http-equiv="refresh" content="30" />
<title>Waiting for passengers</title>
<link rel="stylesheet" type="text/css" href="../css/driverWaitingPage.css">
<link rel="stylesheet" type="text/css" href="../css/login.css">

</head>
<body>

	<%
		String request_id = request.getParameter("request_id");
		String offer_id = request.getParameter("offer_id");
		String driver_email = session.getAttribute("user_email").toString();
		String p_email = request.getParameter("p_email");
			
		int selected_passenger_number = (Integer)session.getAttribute("selected_passenger_number");
		int max_passenger_number = (Integer)session.getAttribute("max_passenger_number");
		
		System.out.println(selected_passenger_number);

		try{										
			String url = "jdbc:mysql://cs336project.crnaoqpbquqk.us-east-1.rds.amazonaws.com:3306/cs336project";
			Class.forName("com.mysql.jdbc.Driver");
			Connection con = DriverManager.getConnection(url, "bbq", "12345678");
			Statement stmt = con.createStatement();
			
			
			// *** check if selected passenger is more than total seats on the car ***
			String check = "SELECT * FROM activated_request r WHERE r.id='" + request_id +"'";
			ResultSet result = stmt.executeQuery(check);
			if(result.next()){
				int a = result.getInt("passenger_number");
				selected_passenger_number += a;
				if (selected_passenger_number > max_passenger_number){
					%>
					<script> 
				    	alert("Sorry, the passenger number will exceed the available seats number. So you cannot add more passenger");
				    	window.location.href = "driverWaitingPage.jsp";
					</script>
					<%
					return;
				}
				else{
					session.setAttribute("selected_passenger_number", selected_passenger_number);
				}
			}
			
			
			String updateRequest = "update activated_request set driver_email='" +driver_email+"', offer_id='" + offer_id + "' where id='" +request_id+"'";
			//out.println(updateRequest);
			stmt.executeUpdate(updateRequest);
			
			String updateTmpMatch = "insert into tmp_ride_match (offer_id, driver_email, passenger_email) values ('" + offer_id + "', '" + driver_email + "', '" + p_email + "')";
			//System.out.println(updateTmpMatch);
			stmt.executeUpdate(updateTmpMatch);
			
			out.print("waiting for passenger to respond");
			
			
		}catch(Exception e){
			out.println("Failed(in match.jsp)");
		}
		
		%>
		<script> 
	    	window.location.href = "driverWaitingPage.jsp";
		</script>			
		<%
		
		/*
		String mail_result;
		 
		String to = "bl469@rutgers.edu";
		   
		String from = "codegeasslbc@163.com";

		String host = "smtp.163.com";

		String pass = "Lbc@676893";
		
		Properties props = System.getProperties();

		props.put("mail.smtp.starttls.enable", "true"); // added this line
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.user", from);
        props.put("mail.smtp.password", pass);
        props.put("mail.smtp.port", "25");
        props.put("mail.smtp.auth", "true");

		
		Session mailSession = Session.getDefaultInstance(props, null);
		try{
			
		    MimeMessage message = new MimeMessage(mailSession);
		    
		    message.setFrom(new InternetAddress(from));
		    message.addRecipient(Message.RecipientType.TO,
		                               new InternetAddress(to));
		    message.setSubject("get an offer! from Rutgers free ride");
     	    message.setText("Dear passenger: your requested is accepted by a driver. here is driver's email: " + driver_email);
		    
     	   System.out.println("get 1");
     	   Transport transport = mailSession.getTransport();
     	  System.out.println("get 2");
           transport.connect(host, from, pass);
           System.out.println("get 3");
           transport.sendMessage(message, message.getAllRecipients());
           transport.close();
     	    
		    
     	    mail_result = "Sent message successfully....";
		}catch (MessagingException mex) {
		    mex.printStackTrace();
		    mail_result = "Error: unable to send message....";
		}
		
		System.out.println(mail_result);
		//out.print(driver_email + request_id + offer_id);
		*/
	%>
</body>
</html>