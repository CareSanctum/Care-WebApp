import axios from "axios";

export const viewuserlistRequest = async (username:string) => {
    try {
        // Log the request URL
        
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/get-assigned-users/${username}`, {
            // Add timeout to avoid hanging
            timeout: 5000,
            // Log request headers for debugging
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        
        // Log successful response
        console.log('Response received:', response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios Error:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
                code: error.code
            });
        } else {
            console.error('Unexpected error:', error);
        }
        throw error; // Re-throw to handle in the component
    }
}