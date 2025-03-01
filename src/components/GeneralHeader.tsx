import React from "react";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const GeneralHeader = () => {
    const navigate = useNavigate();
    return (
        <header className="bg-white  border-b border-primary/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <Logo />
                <div className="flex items-center gap-4">
                    <Button variant="outline" className="flex items-center gap-2 " onClick={() => navigate('/signin')}>
                        Log In
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2 " onClick={() => navigate('/signup')}>
                        Sign up 
                    </Button>
                </div>
            </div>
        </header>
    );
}

export default GeneralHeader;
