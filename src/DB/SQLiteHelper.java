package DB;

import java.sql.*;

public class SQLiteHelper {
	
	 private static Connection c = null;
	
	public static void connectDB() {
		    try {
		      Class.forName("org.sqlite.JDBC");
		      c = DriverManager.getConnection("jdbc:sqlite:addressBook.db");
		    } catch ( Exception e ) {
		      System.err.println( e.getClass().getName() + ": " + e.getMessage() );
		      System.exit(0);
		    }
		    System.out.println("Opened database successfully");
	}
	
	public static void createTable(String tableName) {
		 Statement stmt = null;
		 try {
			 stmt = c.createStatement();
		      String sql = "CREATE TABLE "+ tableName.toUpperCase() + " " +
		                  /* "(ID INT PRIMARY KEY     NOT NULL," +*/
		                   "( FNAME           TEXT    NOT NULL, " + 
		                   " LNAME            TEXT     NOT NULL, " + 
		                   " PHONENUM        INT)"; 
		      stmt.executeUpdate(sql);
		      stmt.close();
		      c.close();
		 } catch ( Exception e ) {
		      System.err.println( e.getClass().getName() + ": " + e.getMessage() );
		      System.exit(0);
		    }
		    System.out.println("Table created successfully");
	}
	
	
	public static void insertContact(String fname, String lname, int phonenum) {
		 try {
			 PreparedStatement pstmt = c.prepareStatement("INSERT INTO CONTACTS "
					 									+ "(FNAME, LNAME, PHONENUM) VALUES(?,?,?)");
			 pstmt.setString(1, fname);
			 pstmt.setString(2, lname);
			 pstmt.setInt(3, phonenum);
		     pstmt.executeUpdate();
		     pstmt.close();
		     c.close();
		 } catch ( Exception e ) {
		      System.err.println( e.getClass().getName() + ": " + e.getMessage() );
		      System.exit(0);
		    }
		    System.out.println("Table created successfully");
	}

}
