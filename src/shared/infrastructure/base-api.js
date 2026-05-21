import axios from "axios";

const platformApi = import.meta.env.VITE_NURSING_PLATFORM_API_URL;

export class BaseApi {
    /** @type {import('axios').AxiosInstance} */
    #http;

    constructor() {
        this.#http = axios.create({
            baseURL: platformApi,
            headers: { 'Content-Type': 'application/json' }, 'Access-Control-Allow-Origin': '*'
        })
    }

    /**
     * Axios client used by infrastructure endpoint adapters.
     * @returns {import('axios').AxiosInstance}
     */
    get http() {
        return this.#http;
    }
}