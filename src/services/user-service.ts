<<<<<<< HEAD
 import create from "./http-service";

interface User {
        id: number;
        name: string;
        email: string;
        username: string;
}
    


export default   create("/users");



// class UserService {
//     getAuthUsers() {
//      const controller = new AbortController();
//      const request = apiClient.get<User[]>("/users", { signal: controller.signal });
//      return  { request, controller };//cen
//  }

//     getUser(id: number) {
//         return apiClient.get<User>(`/users/${id}`);
//     }

//     updateUser(user: User) {
//         return apiClient.put<User>(`/users/${user.id}`, user);
//     }

//     deleteUser(id: number) {
//         return apiClient.delete(`/users/${id}`);
//     }
//     createUser(user: User) {
//         return apiClient.post<User>("/users", user);
//     }

// }
=======
import create from "./http-service";

export interface User {
    id: number;
    name: string;
    email: string;
    username: string;
  }

export default create('/users');
>>>>>>> 159315e378d1a620abba849349d6bcff94b9c02c
