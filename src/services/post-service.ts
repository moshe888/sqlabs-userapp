<<<<<<< HEAD
import apiClient from "./api-client";
import create from "./http-service";

export interface Post {
       userId: number;
         id: number;
       title: string;
       body: string;
 }
   


export default   create("/posts");
=======
import create from "./http-service";

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
  }


export default create('/posts');
>>>>>>> 159315e378d1a620abba849349d6bcff94b9c02c
