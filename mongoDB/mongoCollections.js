//SCRIPT FOR CREATING MONGO DATABASE COLLECTIONS

//Run the command "mongo mongoCollections.js" on command prompt(outside mongo shell) 
//to execute the script 

print('****Connecting Mongo - shoppingCart database****');
var db = connect('localhost:27017/shoppingCart');


//delete collection if already exists
db.customers.drop();

print('****creating Collection - Customer Profile****');
//create the names collection and add documents to it
db.createCollection("customers") ; //  

db.customers.insert({'firstname':'Test',
					'lastname':'SJSU',
					'address': {'addrline1':'4289 Blacow Road',
								'addrline2':'',
								'city':'Fremont',
								'state':'CA',
								'zip' : '94538',
								'country' : 'USA'},
					'contactinfo' :'+14084025658',
					'email':'test@sjsu.edu',
					'password' : 'test'});
//db.customers.insert({'name' : 'Peter Campbell'});

print('****Customer Profile Data****');
customersInfo = null;
//set a reference to all documents in the database
customersInfo = db.customers.find();

//iterate the names collection and output each document
while (customersInfo.hasNext()) {
   printjson(customersInfo.next());
}
    
    