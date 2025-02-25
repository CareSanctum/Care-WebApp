import axios from "axios";

export const contactCMRequest = async (username: string) => {
    try{
        const response = await axios.post("http://192.168.1.66:8080/api/contact-CM/",{
            username: username
        })
        return response.data.message;
    }
    catch(error){
        console.log(error);
    }
}