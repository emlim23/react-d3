import fetch from 'isomorphic-fetch';

let apiUrl = 'http://localhost:3000';

let defaultHeaders = {
    'Content-Type': 'application/json'
};

let store = null;
let errorHandlers = [];

const Api = {
    setStore: (s) => {
        store = s;
    },

    setHeaders: (headers) => {
        Object.keys(headers).forEach((header) => {
            Api.setHeader(header, headers[header]);
        });
    },

    setHeader: (header, value) => {
        defaultHeaders[header] = value;
    },

    setToken: (token) => {
        Api.setHeaders({
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json'
        });
    },

    addErrorHandler: (handler) => {
        errorHandlers.push(handler);
    },

    get: (url, headers) => {
        return Api.send(url, {
            method: 'get',
            headers: headers
        });
    },

    post: (url, body, headers) => {
        return Api.send(url, {
            method: 'post',
            headers: headers,
            body: body
        });
    },

    put: (url, body) => {
        let headers = Object.assign({}, defaultHeaders);
        return Api.send(url, {
            method: 'put',
            headers: headers,
            body: body
        });
    },

    send: (url, options) => {
        let headers = Object.assign({}, defaultHeaders, options.headers || {});

        let opt = {
            method: options.method || 'get',
            headers: headers,
        };

        let type = options.type || 'json';

        if((type === 'json') &&(options.body)) {
            opt.body = JSON.stringify(options.body);
        }

        return fetch(`${apiUrl}/${url}`, opt).then(res => {
            if(!res.ok) {
                for(let handler of errorHandlers) {
                    handler(res);
                }
            }
            return res;
        });
    }
}

export default Api;
