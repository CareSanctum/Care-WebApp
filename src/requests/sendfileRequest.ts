import axios from "axios";

export const sendfileRequest = async (formData: FormData, accessToken: string) => {
    try{
        const response = await axios.post('http://192.168.1.104:8080/api/upload-file/', formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data' 
          },
        });
        console.log('File uploaded successfully:', response.data);
        return response;
      }
      catch(error){
        console.error('Error uploading file:', error);
        throw error;
      }
}