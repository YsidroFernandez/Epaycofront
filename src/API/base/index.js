import axios from 'axios';


// const apiUrl = 'http://10.0.2.2:3005/api/';  //ANDROID EMULATE
const apiUrl = 'http://192.168.1.106:4000/api/';  //device

class Request {
    constructor(url, baseUrl) {
        this.url = url;
        this.baseUrl = baseUrl || apiUrl;
        this.request = axios.create(
            {
                baseURL: this.baseUrl,
                headers: { 'content-type': 'application/json' }
            });

    }

    get(contentType = 'application/jsno', token=null) {

        this.request.defaults.headers.common = {
            'Content-Type': contentType,
            'Authorization': 'Bearer ' + token
        };
        return this.request({ url: this.url });
    }

    getOne(id, contentType = 'application/json', token = null) {

        this.request.defaults.headers.common = {
            'Content-Type': contentType,
            'Authorization': 'Bearer ' + token
        };

        return this.request({ url: this.url + '/' + id });
    }

    post(value, contentType = 'application/json', token = null) {

        this.request.defaults.headers.common = {
            'Content-Type': contentType,
            'Authorization': 'Bearer ' + token
        };
        return this.request({ method: 'POST', url: this.url, data: value });
    }

    put(value, id, contentType='application/json',token=null) {

        this.request.defaults.headers.common = {
            'Content-Type': contentType,
            'Authorization': 'Bearer ' + token
        };
        return this.request({ method: 'PUT', url: this.url + '/' + id, data: value });
    }

    delete(id,contentType='application/json',token=null) {

        this.request.defaults.headers.common = {
            'Content-Type': contentType,
            'Authorization': 'Bearer ' + token
        };
        return this.request({ method: 'DELETE', url: this.url + '/' + id });

    }


}

export default Request;