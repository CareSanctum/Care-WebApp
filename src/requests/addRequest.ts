import axios from "axios"
export const addReqeuest = async (userform: any, username: string, accessToken: string) =>{
    const patientData = Object.fromEntries(
      Object.entries({
        full_name: userform.fullName,
        dob: userform.dob,
        gender: userform.gender,
        blood_group: userform.blood_group,
        height: userform.height,
        weight: userform.weight,
        usual_wake_up_time: userform.wakeUpTime,
        current_location_status: userform.locationStatus,
        phone: userform.phone,
        alternate_phone: userform.altPhone,
        address: userform.address,
        pin_code: userform.pincode,
      }).filter(([_, value]) => value !== null && value !== "") // Remove empty/null fields
    );    
    const emergencyContacts = Object.fromEntries(
      Object.entries({
        next_of_kin_name: userform.emergencyName,
        next_of_kin_contact_number: userform.emergencyPhone,
        relationship_with_senior: userform.relationship,
        neighbor_name: userform.neighborName,
        neighbor_contact_number: userform.neighborPhone,
      }).filter(([_, value]) => value !== null && value !== "") // Remove empty/null fields
    );
    const medicalHistory = Object.fromEntries(
      Object.entries({
        existing_health_conditions: userform.healthConditions,
        known_allergies: userform.allergies,
        past_surgeries: userform.surgeries
      }).filter(([_, value]) => value !== null && value !== "") // Remove empty/null fields
    );
    const preferrredServices = Object.fromEntries(
      Object.entries({
        preferred_doctor_name: userform.doctorName,
        doctor_contact_number: userform.doctorContact,
        preferred_hospital_or_clinic: userform.preferredHospital,
      }).filter(([_, value]) => value !== null && value !== "") // Remove empty/null fields
    );
    const lifestyleDetails = Object.fromEntries(
      Object.entries({
        activity_level: userform.Activity_level,
        diet_preferences: userform.Dietary_prefernces,
        requires_mobility_assistance: userform.mobilityAssistance === "on" ? "True": "False",
        has_vision_impairment: userform.visionImpairment === "on" ? "True": "False",
        has_hearing_impairment: userform.hearingImpairment === "on" ? "True": "False",
      }).filter(([_, value]) => value !== null && value !== "") // Remove empty/null fields
    );
    try{
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/add_patient_data/`, {
            username: username,
            patient: patientData,
            emergency_contacts:emergencyContacts,
            medical_history:medicalHistory,
              preferred_medical_services:preferrredServices,
              lifestyle_details: lifestyleDetails
        },{
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json"
            },
            validateStatus: (status) => {
              // Treat 2xx and 400 as valid status codes
              return status >= 200 && status < 401;
            }
          });
          return response;
    }
    catch(error: any){
        console.log("Request Not sent");
        throw error;
      }
}