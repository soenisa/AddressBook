package elemClass;
import java.util.Scanner;
import DAOs.ContactSQLiteDAO;

import DB.SQLiteHelper;
import java.util.ArrayList;
import elemClass.Contact;

public class Console {
	
	public static void main(String args[]) {
		
		Scanner scanIn = new Scanner(System.in);
		String userIn;
		ArrayList<Contact> contacts = new ArrayList<Contact>();
		boolean exit = false;
		ContactSQLiteDAO SQLite = new ContactSQLiteDAO();
		
		
		while(exit == false) {
			System.out.println("Enter a command:");
			userIn = scanIn.next();
			
			if(userIn.toLowerCase().equals("createcontact")) {
				Contact temp = new Contact();
				contacts.add(temp);
				System.out.println("First name:");
				temp.setFirstName(scanIn.next());
				System.out.println("Last name:");
				temp.setLastName(scanIn.next());
				System.out.println("Phone Number:");
				temp.setPhoneNum(Integer.parseInt(scanIn.next()));
				System.out.println("Contact Created!");
			} else if(userIn.toLowerCase().equals("getcontact")) {
				System.out.println("Search by contact last name:");
				userIn = scanIn.next();
				for (int i = 0; i < contacts.size(); i++)
			        if(userIn.equals(contacts.get(i).getLastName()))
			            System.out.println(contacts.get(i).toString());
			} 
			
			
			else if(userIn.toLowerCase().equals("connectdb")) {
				System.out.println("Establishing connection...");
				SQLiteHelper.connectDB();
			}else if(userIn.toLowerCase().equals("createtable")) {
				System.out.println("New table name:");
				userIn = scanIn.next();
				SQLiteHelper.createTable(userIn);
			}else if(userIn.toLowerCase().equals("insertnewcontact")) {
				Contact temp = new Contact();
				contacts.add(temp);
				System.out.println("First name:");
				temp.setFirstName(scanIn.next());
				System.out.println("Last name:");
				temp.setLastName(scanIn.next());
				System.out.println("Phone Number:");
				temp.setPhoneNum(Integer.valueOf(scanIn.next()));
				
				SQLite.createInstance(temp.getFirstName(), temp.getLastName(), temp.getPhoneNum());
				System.out.println("Contact Inserted into Database!!");
			} 
			
			
			else if(userIn.toLowerCase().equals("exit")) {
				exit = true;
				// TODO: Don't leave this in here
				// TODO: Connections should open and close as queries are executed
				SQLiteHelper.disconnectDB();
				System.out.println("Goodbye :'(");
			} else {
				System.out.println("That command is not recognized :(");
			}
		}
	}
	
}
