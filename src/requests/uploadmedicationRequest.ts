import axios from "axios";

export const uploadmedicationRequest = async (formData: FormData) => {
    try{
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/medications/upload-document/`, formData, {
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