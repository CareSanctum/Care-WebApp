import axios from "axios";

export const updatehealthdataRequest = async (data: any, username: string) => {
    try{
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/health-data/update/${username}/`, {
            username: username,
            vital_signs:{
                heart_rate: data.HeartRate,
                blood_pressure: data.BloodPressure,
                respiratory_rate: data.RespiratoryRate,
                temperature: data.Temperature
            },
            health_metrics:{
                blood_sugar:data.BloodSugar,
                ecg:data.Ecg,
                bmi: data.Bmi,
                sleep_level: data.SleepLevel,
                stress_level:data.StressLevel,
                blood_oxygen: data.BloodOxygen,
            },
            health_status_overview:{
                status_message: data.StatusMessage,
                next_checkup_date: data.NextCheckupDate,
            }

        },{
            validateStatus: (status) => {
              // Treat 2xx and 400 as valid status codes
              return status >= 200 && status < 401;
            }
        })
        return response;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}