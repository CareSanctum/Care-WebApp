import { useState, useEffect } from "react";
import { useAppSelector } from "@/store/hooks";
import { getreferralsrankRequest } from "@/requests/Referrals/getreferralsranksRequest";
export interface ReferralRankType {
    rank: string;
    username : string;
    total_earnings : number;
}

const useReferralRank = () => {
    const { username } = useAppSelector((state) => state.auth);
    const [rankData, setRankData] = useState<ReferralRankType[] | null>(null);

    useEffect(() => {
        if (!username) return; // Ensure username is defined before making a request

        const fetchRankData = async () => {
            try {
                const data = await getreferralsrankRequest();
                setRankData(data);
            } catch (error) {
                console.error("Failed to fetch referral rankings", error);
            }
        };

        fetchRankData();
    }, [username]);

    console.log(rankData);
    return rankData;
};

export default useReferralRank;