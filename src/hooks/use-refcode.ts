import { useEffect, useState } from "react";
import { getb2creferralcodeRequest } from "@/requests/Referrals/getreferralcodeRequest";
import { useAppSelector } from "@/store/hooks";
export  interface Referral {
    link: string;
    code: string;
}

const useReferral = () => {
    const { username } = useAppSelector((state) => state.auth);
    const [referralData, setReferralData] = useState<Referral | null>(null);
    
    useEffect(() => {
        if (!username) return;  // Ensure username is defined before making a request
        
        const fetchCode = async () => {
            try {   
                const response = await getb2creferralcodeRequest(username);

                setReferralData({ link: response.link, code: response.code });
            } catch (error) {
                console.error("Failed to fetch referral data", error);
            }
        };

        fetchCode();
    }, [username]);
    console.log(referralData);
    return referralData;
};

export default useReferral;