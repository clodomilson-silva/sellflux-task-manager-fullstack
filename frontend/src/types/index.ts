export interface Task {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
  }
  
  export interface Comment {
  id: string;
  task_id: string;
  content: string;
  created_at: string;
}