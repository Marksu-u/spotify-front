const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('mk-fospot', 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore('audios', { keyPath: '_id' });
      db.createObjectStore('albums', { keyPath: '_id' });
    };

    request.onerror = (event) => {
      reject(`Database error: ${event.target.errorCode}`);
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
  });
};

export const saveAudios = async (audios) => {
  const db = await openDatabase();
  const transaction = db.transaction('audios', 'readwrite');
  const store = transaction.objectStore('audios');

  for (let audio of audios) {
    store.put(audio);
  }
};

export const getAudios = async () => {
  const db = await openDatabase();
  const transaction = db.transaction('audios', 'readonly');
  const store = transaction.objectStore('audios');

  return new Promise((resolve, reject) => {
    const request = store.getAll();

    request.onerror = () => {
      reject('Failed to retrieve data from database.');
    };

    request.onsuccess = () => {
      resolve(request.result);
    };
  });
};

export const saveAlbums = async (albums) => {
  const db = await openDatabase();
  const transaction = db.transaction('albums', 'readwrite');
  const store = transaction.objectStore('albums');

  for (let album of albums) {
    store.put(album);
  }
};

export const getAlbums = async () => {
  const db = await openDatabase();
  const transaction = db.transaction('albums', 'readonly');
  const store = transaction.objectStore('albums');

  return new Promise((resolve, reject) => {
    const request = store.getAll();

    request.onerror = () => {
      reject('Failed to retrieve data from database.');
    };

    request.onsuccess = () => {
      resolve(request.result);
    };
  });
};
