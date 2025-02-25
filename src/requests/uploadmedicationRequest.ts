import axios from "axios";

export const uploadmedicationRequest = async (formData: FormData) => {
    try{
        const response = await axios.post('http://192.168.1.66:8080/api/medications/upload-document/', formData, {
          headers: {
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