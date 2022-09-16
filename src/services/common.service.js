import axios from "axios";
import { API_BASE_URL } from "./config";
import { API_BASE_PATH } from "./config";

const config = {
    headers: { Accept: "application/json", "Content-Type": "application/json" },
};

export default class CommonService {

    static async sendQuestion(question, selectedMaxResults, selectedCollection, selectedModel) {
        let res = await axios.get(`${API_BASE_URL}/${API_BASE_PATH}/unknow`, { params: { question: question, selectedMaxResults: selectedMaxResults, selectedCollection: selectedCollection, selectedModel: selectedModel } }, config)
            .then((response) => {
                console.log(response);
                return response;
            })
            .catch(function (error) {
                console.log('error.message', error.message ? error.message : '');
                console.log('error.code', error.code ? error.code : '');
                if (error.response) {
                    console.log('error.response.status', error.response.status);
                    console.log('error.response.data', error.response.data);
                }
                return error;
            });
        return res;
    }

    static async getCollections() {
        let res = await axios.get(`${API_BASE_URL}/${API_BASE_PATH}/user`, { params: {} }, config)
            .then((response) => {
                console.log(response);
                return response;
            })
            .catch(function (error) {
                console.log('error.message', error.message ? error.message : '');
                console.log('error.code', error.code ? error.code : '');
                if (error.response) {
                    console.log('error.response.status', error.response.status);
                    console.log('error.response.data', error.response.data);
                }
                return error;
            });
        return res;
    }

    static async getModels() {
        let res = await axios.get(`${API_BASE_URL}/${API_BASE_PATH}/user`, { params: {} }, config)
            .then((response) => {
                console.log(response);
                return response;
            })
            .catch(function (error) {
                console.log('error.message', error.message ? error.message : '');
                console.log('error.code', error.code ? error.code : '');
                if (error.response) {
                    console.log('error.response.status', error.response.status);
                    console.log('error.response.data', error.response.data);
                }
                return error;
            });
        return res;
    }

}