import axios from 'axios';
import { InvokableUrl } from "../model/InvokableUrl";

export const invokeUrl = (invokable: InvokableUrl): Promise<void> => {
    const url = `${invokable.url}/${invokable.id}`;
    console.log(`Invoking URL ${url}`)
    // We are sending an empty payload, and not expecting any response.
    return axios.post(url, {}, { timeout: 1000 })
        .then(() => {
            return
        })
        .catch(error => {
            console.error(`Error invoking URL ${url}. Continuing..`, error);
        });
}
