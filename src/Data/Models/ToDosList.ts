export interface TodoList {
  _id: string; // MongoDB ObjectId as a string
  name: string;
  description?: string; // Optional since MongoDB allows missing fields
  //owner: string; // User ID reference
  //collaborators: string[]; // Array of User ID references
}
