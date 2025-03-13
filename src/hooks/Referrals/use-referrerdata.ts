import { useState, useEffect } from "react";
import { useAppSelector } from "@/store/hooks";
import { getreferrerdetailsRequest } from "@/requests/Referrals/getreferrerdetailsRequest";

export interface SimplifiedReferralDetails {
    type: "B2B_PARTNER" | "B2C_USER";
    referral_code: string;
    company_name?: string;
    image_link?: string;
    username?: string;
}

const useReferralDetails = () => {
    const [details, setDetails] = useState<SimplifiedReferralDetails | null>(null);
    const { username } = useAppSelector((state) => state.auth);

    useEffect(() => {
        const fetchReferralDetails = async () => {
            try {
                const response = await getreferrerdetailsRequest(username);
                const formattedDetails: SimplifiedReferralDetails = {
                    type: response.b2b_details ? "B2B_PARTNER" : "B2C_USER",
                    referral_code: response.referral_code.code,
                    ...(response.b2b_details && {
                        company_name: response.b2b_details.company_name,
                        image_link: response.b2b_details.image_link,
                    }),
                    ...(response.b2c_details && {
                        username: response.b2c_details.username,
                    }),
                };
                setDetails(formattedDetails);
            } catch (err) {
                console.error("Failed to fetch referral details", err);
            }
        };

        fetchReferralDetails();
    }, [username]); // Re-run when username or referral_code changes
    console.log(details);
    return details;
};

export default useReferralDetails;