import axios from "axios";

export const gethealthdataRequest = async (username: string) =>{
    try {
        const response = await axios.get(`http://192.168.1.66:8080/api/health-data/${username}`,{
            // Add timeout to avoid hanging
            timeout: 5000,
            // Log request headers for debugging
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        console.log('Response received:', response.data);
        return response.data;
    }
    catch(error){
        console.log(error);
    }
}