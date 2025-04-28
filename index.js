const axios = require("axios");
const baseUrl = "https://api.lygosapp.com/v1/";

class LYGOS {

    /**
     * 
     * @param {string} api_key - Get it to https://pay.lygosapp.com/dashboard/api-keys 
     */
    constructor(api_key) {
        if (!api_key) throw new Error("API KEY is required");
        this.headers = {
            'api-key': api_key,
            'Content-Type': 'application/json'
        };
    }

    /** 
      * This function returns an object with the link where a user is to be redirected in order to complete his payment
      *
      * Below is a parameter template. Just amount is required
      *
      * data = {
      *     "amount": Integer ,
      *     "shop_name": String,
      *     "order_id": String,
      *     "failure_url": String | null,
      *     "success_url": String | null,
      *     "message": String | null
      * }
      */
    initPayment(data) {
        const self = this;
        return new Promise(async (resolve) => {
            try {
                if (!data?.shop_name) return resolve({ error: "shop name is required", status: 400 });
                if (!data?.order_id) return resolve({ error: "order id is required", status: 400 });
                if (!data?.amount) return resolve({ error: "amount required", status: 400 });
                if (!Number.isInteger(data.amount)) return resolve({ error: "amount must be of type integer", status: 400 });
                if (data.amount < 100) return resolve({ error: "amount cannot be less than 100 XAF", status: 400 });

                const config = {
                    method: "post",
                    url: baseUrl + "/gateway",
                    headers: self.headers,
                    data: data,
                };

                const response = await axios(config);
                resolve(response.data);
            } catch (e) {
                const statusCode = e.response ? e.response.status : 500;
                const message = e.response && e.response.data ? e.response.data.details.message : "Erreur inconnue";
                resolve({ error: message, status: statusCode });
            }
        });
    }

    /**
     * This method return status of payment in an object like {"order_id": "<string>","status": "<string>"} 
     * 
     * @param {string} order_id - The id that you mention created payment
     */
    paymentStatus(order_id) {
        const self = this;
        return new Promise(async (resolve) => {
            try {
                if (!order_id) return resolve({ error: "Mention the order Id", status: 400 });

                const config = {
                    method: "get",
                    url: baseUrl + "/gateway/payin/" + order_id,
                    headers: self.headers,
                };

                const response = await axios(config);
                resolve(response.data);
            } catch (e) {
                const statusCode = e.response ? e.response.status : 500;
                const message = e.response && e.response.data ? e.response.data.message : "Erreur inconnue";
                resolve({ error: message, status: statusCode });
            }
        });
    }

    /**
     * This method return integral information of your payment
     * 
     * @param {string} order_id - The id that you mention created payment
     */
    getPayment(order_id) {
        const self = this;
        return new Promise(async (resolve) => {
            try {
                if (!order_id) return resolve({ error: "Mention the getaway Id", status: 400 });

                const config = {
                    method: "get",
                    url: baseUrl + "/gateway/" + order_id,
                    headers: self.headers,
                };

                const response = await axios(config);
                resolve(response.data);
            } catch (e) {
                const statusCode = e.response ? e.response.status : 500;
                const message = e.response && e.response.data ? e.response.data.message : "Erreur inconnue";
                resolve({ error: message, status: statusCode });
            }
        });
    }

    /**
     * List of all transactions you made
     * 
     * @returns [
     * {
     *     "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
     *     "amount": 123,
     *     "currency": "<string>",
     *     "shop_name": "<string>",
     *     "message": "<string>",
     *     "user_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
     *     "creation_date": "2023-11-07T05:31:56Z",
     *     "link": "<string>",
     *     "order_id": "<string>",
     *     "success_url": "<string>",
     *     "failure_url": "<string>"
     * }
     * ]
     */
    listOfPayment() {
        const self = this;
        return new Promise(async (resolve) => {
            try {
                const config = {
                    method: "get",
                    url: baseUrl + "/gateway/",
                    headers: self.headers,
                };

                const response = await axios(config);
                resolve(response.data);
            } catch (e) {
                const statusCode = e.response ? e.response.status : 500;
                const message = e.response && e.response.data ? e.response.data.message : "Erreur inconnue";
                resolve({ error: message, status: statusCode });
            }
        });
    }

}

module.exports = LYGOS;