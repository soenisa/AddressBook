package DAOs;

import java.util.HashMap;

import elemClass.Contact;
import DB.SQLiteHelper;

public class ContactSQLiteDAO implements ContactDAO {

	@Override
	public Contact createInstance(String firstName, String lastName,
			int phoneNum) {
		SQLiteHelper.insertContact(firstName, lastName, phoneNum);
		return new Contact(firstName, lastName, phoneNum);
	}

	@Override
	public Contact getInstance(Long surrogateKey) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Contact updateInstance(Contact contact) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public HashMap<Long, Contact> getAllContacts() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteContact(Contact contact) {
		// TODO Auto-generated method stub
		
	}
	
	

}
