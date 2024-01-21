package newpackage;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Properties;
import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMultipart;
import java.io.*;
import java.util.*;
import javax.mail.*;
import javax.mail.internet.*;
import java.util.*;
import javax.activation.*;
import srvltpkg.Config_Booking;
import newpackage.paynow;
import java.sql.*;
import dbcon.DBConnection;

/**
 *
 * @author NaVindu69;
 */
@WebServlet(urlPatterns = {"/emailcontroller"})
public class emailcontroller extends HttpServlet {

  
   

   

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        PrintWriter out = response.getWriter();
        response.setContentType("text/html");
        /////////////////////////////////////////////
        
        String host ="smtp.gmail.com";
        String user ="abccinemagroup05@gmail.com";
        String port ="587";
        String password = "qrzmdvmvtgpmxyrj";
        String subject =  paynow.name +" your order is Successful";
        String toaddress = paynow.email;
        String message =  "you Have sucessfully Reserved ,\nFull tickets  :  " +Config_Booking.full_tickets + "\nHalf tickets : "+ Config_Booking.kid_tickets+  "\nMovie : "+paynow.film+"\nTime : "+paynow.time+"\nDate : "+paynow.date+"\nTheator : "+paynow.theator+"\nTotal Amount : "+Config_Booking.total_price+"\nThank You For Your Purchase \nABC Cinema\n Group 5\n@NL69";
        
       ///////////////////////////////////////////////////////
       //entering to database
       Connection con = null;
       PreparedStatement nlk =null;
       try