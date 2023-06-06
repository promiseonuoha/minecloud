import { Client, Account, Databases, Storage } from 'appwrite';
import config from '../config'

const client = new Client();

export const databases = new Databases(client);

export const storage = new Storage(client);

client.setEndpoint(config.endpoint).setProject(config.projectId);

export const account = new Account(client);

export const addFile = async (id: string, name: string, path: string, email: string) => {
  await databases.createDocument(config.databaseId, config.collectionId, id, {
    file: [id, name, path, 'No', email],
  });
};

export const creatingFolder = async (name: string, path: string, email: string) => {
  await databases.createDocument(config.databaseId, config.collectionId, crypto.randomUUID(), {
    folder: [name, path, email],
  });
};

export const deleteDocument = async (id: any) => {
  await databases.deleteDocument(config.databaseId, config.collectionId, id);
};

export const updateDocument = async (id: string, name: string, path: string, isFavourite: string, email: string) => {
  await databases.updateDocument(config.databaseId, config.collectionId, id, {
    file: [id, name, path, isFavourite, email],
  });
};

export const deleteBucketFile = async (id: string) => {
  await storage.deleteFile(config.bucketId, id);
};
