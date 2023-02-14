const axios = require('axios');
export const axiosFetch = async (args: any): Promise<any> => {
    try {
        const response = await axios(args);
        console.log(typeof response);
        const { status } = response;
        if (status >= 200) {
            const { data } = response;
            return data;
        }
    }
    catch (e: any) {
        console.log('Error occurred during axiosFetch', e);
        return 'Error encountered while fetching snippet';
    }
};