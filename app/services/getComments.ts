import { Comment } from '../types/index';

export const getComments = async (): Promise<Comment[]> => {
  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts/1/comments'
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
