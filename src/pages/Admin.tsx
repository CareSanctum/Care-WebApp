import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { CardContent, Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { updatehealthdataRequest } from "@/requests/updatehealthdataRequest";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Controller } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { viewuserlistRequest } from "@/requests/viewuserlistRequest";
import { useNavigate } from "react-router-dom";
import { logout } from "@/store/slices/adminauthSlice";


const Admin = () => {
    const {register, handleSubmit, getValues, control} = useForm();
    const {toast} = useToast();
    const [usernames, setusernames] = useState<string[]>([]);
    const adminusername = localStorage.getItem("admin_username");
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    useEffect(() => {
        const fetchUsernames = async () => {
          try {
            const response = await viewuserlistRequest(adminusername);
            setusernames(response.map(user => user.username)); // Assuming the response format is { usernames: [...] }
          } catch (error) {
            console.error("Error fetching usernames:", error);
          }
        };
        fetchUsernames();
      }, []);
      
    const {adminaccessToken} = useAppSelector((state) => state.adminauth)
    const onSubmit = async () =>{
        const values = getValues();
        console.log(values);
        try{
            const response = await updatehealthdataRequest(values, values.User, adminaccessToken);
            if(response.status == 200){
                toast({
                    title: "Data Update",
                    description: "User Data has been successfully updated!",
                    variant: "success"
                  });
                  setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        }catch(error){
            console.log(error);
        }
    }
    const handleSignOut = () => {
            // Clear session and local storage
            dispatch(logout());
          
            // Clear all cookies
          document.cookie.split(";").forEach((cookie) => {
            document.cookie = cookie
              .replace(/^ +/, "")
              .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
          });
          navigate('/signin');
            // Show toast message
            toast({
              title: "Signed out successfully",
              duration: 2000,
            });
          
            // Redirect to sign-in page
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">Admin Dashboard</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
                             <Selectusernames control={control} usernames={usernames} />
                             <Vitals register={register}/>
                             <Health_Metrics register={register} control={control}/>
                             <Health_Status register={register}/>
                             {/* <Checkup register={register} control={control}/> */}

                            <div className="flex justify-between pt-6">
                                <Button type="submit">
                                    Save Data
                                </Button>
                                <Button onClick={() => handleSignOut()}>
                                    Sign Out
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}


export default Admin;

const Selectusernames = ({  control, usernames }: {control: any, usernames: string[]}) => {
    return(
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Select User</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="User">User</Label>
                    <Controller name="User" control={control} defaultValue="Scheduled"
                    render={({ field }) => (              
                        <Select {...field} onValueChange={field.onChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent>
                                {usernames.map((username) => (
                                    <SelectItem key={username} value={username}>
                                        {username}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        )}
                    />
                </div>
            </div>
        </div>
    )
}

const Vitals = ({ register}: { register: any}) => {
    return(
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Vitals Data</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="HeartRate">Heart Rate</Label>
                    <Input id="HeartRate" type="number" {...register("HeartRate", { valueAsNumber: true })}></Input>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="BloodPressure">Blood Pressure</Label>
                    <Input id="BloodPressure" {...register("BloodPressure")}></Input>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="RespiratoryRate">Respiratory Rate</Label>
                    <Input id="RespiratoryRate" type="number" {...register("RespiratoryRate", { valueAsNumber: true })} ></Input>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="Temperature">Temperature</Label>
                    <Input id="Temperature" type="number" step="0.01" {...register("Temperature", { valueAsNumber: true })}></Input>
                </div>
            </div>
        </div>
    )
}

const Health_Metrics = ({ register, control}: { register: any, control: any}) => {
    return(
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Health Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="BloodSugar">BloodSugar</Label>
                    <Input id="BloodSugar" type="number" {...register("BloodSugar", { valueAsNumber: true })}></Input>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="Ecg">Ecg</Label>
                    <Controller name="Ecg" control={control} defaultValue="Normal"
                    render={({ field }) => (              
                        <Select {...field} onValueChange={field.onChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Ecg" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Normal">Normal</SelectItem>
                                <SelectItem value="Abnormal">Abnormal</SelectItem>
                            </SelectContent>
                        </Select>
                        )}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="Bmi">Bmi</Label>
                    <Input id="Bmi" type="number" step="0.01" {...register("Bmi", { valueAsNumber: true })}></Input>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="SleepLevel">Sleep Level</Label>
                    <Input id="SleepLevel" type="number" step="0.01" {...register("SleepLevel", { valueAsNumber: true })}></Input>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="StressLevel">Stress Level</Label>
                    <Controller name="StressLevel" control={control} defaultValue="Low"
                    render={({ field }) => (              
                        <Select {...field} onValueChange={field.onChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Stress Level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Low">Low</SelectItem>
                                <SelectItem value="Moderate">Moderate</SelectItem>
                                <SelectItem value="High">High</SelectItem>
                            </SelectContent>
                        </Select>
                        )}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="BloodOxygen">Blood Oxygen</Label>
                    <Input id="BloodOxygen" type="number" {...register("BloodOxygen", { valueAsNumber: true })}></Input>
                </div>
            </div>
        </div>
    )
}
const Checkup = ({ register, control}: { register: any, control: any}) => {
    return(
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Checkup Schedule</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="ScheduledDate">Scheduled Date</Label>
                    <Input id="ScheduledDate" type="date" {...register("ScheduledDate")}></Input>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="Status">Status</Label>
                    <Controller name="Status" control={control} defaultValue="Scheduled"
                    render={({ field }) => (              
                        <Select {...field} onValueChange={field.onChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Scheduled">Scheduled</SelectItem>
                                <SelectItem value="Completed">Completed</SelectItem>
                                <SelectItem value="Missed">Missed</SelectItem>
                            </SelectContent>
                        </Select>
                        )}
                    />
                </div>
            </div>
        </div>
    )
}
const Health_Status = ({ register}: { register: any}) => {
    return(
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Health Status Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="StatusMessage">Status Message</Label>
                    <Input id="StatusMessage" {...register("StatusMessage")}></Input>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="NextCheckupDate">Next Checkup Date</Label>
                    <Input id="NextCheckupDate" type="date" {...register("NextCheckupDate")}></Input>
                </div>
            </div>
        </div>
    )
}