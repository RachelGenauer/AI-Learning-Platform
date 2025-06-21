export interface User {
  id_number: string;
  name: string;
  phone: string;
}

export interface Prompt {
  user_id: string;
  prompt: string;
  response: string;
  created_at: string;
  category_name: string;
  sub_category_name: string;
}