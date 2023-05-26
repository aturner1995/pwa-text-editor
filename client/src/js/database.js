import { openDB } from 'idb';

// Function to initialize the database
const initdb = async () => {
  // Open the 'jate' database with version 1
  openDB('jate', 1, {
    // Upgrade function is called when the database is created or upgraded
    upgrade(db) {
      // Check if 'jate' object store already exists
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // Create a new object store 'jate' with auto-incrementing keys
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
};

// Function to store data in the database
export const putDb = async (content) => {
  console.log('PUT to the database');
  try {
    // Open the 'jate' database with version 1
    const textDb = await openDB('jate', 1);
    const tx = textDb.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');

    // Store the content in the 'jate' object store
    const request = store.put({ id: 1, text: content });
    await tx.done;
    const result = await request;
    console.log('Data saved to the database', result);
  }
  catch (err) {
    console.error(err);
  }
};

// Function to retrieve all content from the database
export const getDb = async () => {
  console.log('GET all content from the database');
  try {
    // Open the 'jate' database with version 1
    const textDb = await openDB('jate', 1);
    const tx = textDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');

    // Retrieve all objects from the 'jate' object store
    const request = store.getAll();
    await tx.done;
    const result = await request;
    console.log('result-value', result);
    return result;
  }
  catch (err) {
    console.error(err);
  }
};

// Call the initdb function to initialize the database
initdb();
