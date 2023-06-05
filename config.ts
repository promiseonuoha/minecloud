export default {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || '',
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '',
  collectionId: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || '',
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
  bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || '',
};
