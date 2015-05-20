package DAOs;
import java.util.HashMap;

import elemClass.Contact;

public interface ContactDAO {
	
	public Contact createInstance(String firstName, String lastName, int phoneNum);
	
	//use surrogate key here
	public Contact getInstance(Long surrogateKey);
	
	// May either replace entire Contact obj or send certain fields to change... This prob better
	public Contact updateInstance(Contact contact);
	
	public HashMap<Long,Contact> getAllContacts();
	
	public void deleteContact(Contact contact);
	

}
