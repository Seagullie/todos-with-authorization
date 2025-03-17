export interface ToDo {
  _id: string; // MongoDB ObjectId as a string
  title: string;
  description?: string; // Optional if not always present
  completed: boolean;
  listId?: string; // Reference to TodoList, optional if not always set
}
