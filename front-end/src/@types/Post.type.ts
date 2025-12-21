export interface IPost {
  _id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  likes: number[];
  createdAt: string;
  author: {
    username: string;
    image: string;
  };
}
