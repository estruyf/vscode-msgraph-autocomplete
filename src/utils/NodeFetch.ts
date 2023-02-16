import { IGeneratedSnippetURL } from "../providers/SnippetProvider";

// @ts-check
const fetch = require('node-fetch');
export const nodeFetch = async (args: IGeneratedSnippetURL): Promise<string> => {
    try {
        const { url, method, headers, data } = args;
        const response = await fetch.default(url, {
            method,
            headers,
            body: data
        } );
        if (response && response.ok) {
            console.log('Here is the fetch result ', response);
            const data = await response.text();
            return data;
        }
        return '';
    }
    catch (e: any) {
        return 'Error encountered while fetching snippet';
    }
};