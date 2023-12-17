
import apiClient from "./api-client";


interface Entity {
    id: number;

}
    
class httpService {
    endpoint: string;

constructor (endpoint: string) {
    this.endpoint = endpoint;
}



  getALL<T>() {
     const controller = new AbortController();
     const request = apiClient.get<T[]>(this.endpoint, { 
        signal: controller.signal
     });
     return  { request, cancel : controller.abort };//cen
 }

    getUser(id: number) {
        return apiClient.get( this.endpoint + `/${id}`);
    }

    updateUser<T extends Entity>( entity : T) {
        return apiClient.patch ( this.endpoint + `/${entity.id}`, entity);
    }

    deleteUser(id: number) {
        return apiClient.delete ( this.endpoint + `/${id}`);
    }
    createUser<T>( entity : T) {
        return apiClient .post( this.endpoint , entity);
    }

}

const create = (endpoint: string) => {
    return new httpService(endpoint);
}

export default create;
