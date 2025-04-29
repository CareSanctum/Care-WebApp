import React, {useState, useEffect, useRef} from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Pill, Upload, FileText, FlaskConical, Loader2 } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';
import { viewRequest } from '@/requests/viewRequest';
import { sendfileRequest } from '@/requests/sendfileRequest';
import usePrescriptions, {uploadPresciption} from '@/hooks/use-prescriptions';
import useLabReports, { LabReport } from '@/hooks/use-labreports';
import {uploadmedicationRequest} from '@/requests/uploadmedicationRequest';
import useMedications, {Medication} from '@/hooks/use-medications';

export const PrescriptionManagement = () => {
  const { toast } = useToast();
  // const [uploadType, setUploadType] = useState<'prescription' | 'lab'>('prescription');
  const [doctorName, setDoctorName] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [Prescfile, setPrescFile] = useState<File | null>(null);

  const [testName, setTestName] = useState('');
  const [testDate, setTestDate] = useState('');
  const [LRfile, setLRfile] = useState<File | null>(null);

  const [userDetails, setUserDetails] = useState<any>(null);
  const {username} = useAppSelector((state) => state.auth);
  const PrescfileInputRef = useRef<HTMLInputElement | null>(null);
  const LRfileInputRef = useRef<HTMLInputElement | null>(null);
  const medfileInputRef = useRef<HTMLInputElement | null>(null);

  const [medicineName, setmedicineName] = useState('');
  const [dosage, setdosage] = useState('');
  const [prescribedBy, setprescribedBy] = useState('');
  const [expDate, setexpDate] = useState('');
  const [timing, settiming] = useState('');
  const [stock, setstock] = useState('');
  const openPdf = (fileurl:string) => {
      window.open(fileurl, "_blank"); // Opens PDF in a new tab
  }
  //toget the file Name if showable Format
  const getFileName = (url: string | null) => {
    if (!url) return "No File"; // Handle case where URL is missing
    return url.split("/").pop() || "Unknown File"; // Extract file name from URL
  };

  //Handles Change of file
  const handlePrescFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        setPrescFile(event.target.files[0]); // Save the file in state
      }
  };
  const handleLRFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setLRfile(event.target.files[0]); // Save the file in state
    }
};
const {mutate, status: uploadstatus} = uploadPresciption();
  const handlPrescUpload =  () => {
    if (!Prescfile) {
      alert("Please select a file first.");
      return;
    }

    // Create a FormData object
    const sanitizedFileName = Prescfile.name.replace(/\s+/g, "_"); 
    const formData = new FormData();
    formData.append("file", new File([Prescfile], sanitizedFileName, { type: Prescfile.type })); // Append the file with a field name "file"
    formData.append("name", "Presc_file");
    formData.append("user_name", username);
    formData.append("doctor_name", doctorName);
    formData.append("prescribed_date", visitDate);

    mutate(formData, {
      onSuccess: () => {
        setDoctorName("");
        setVisitDate("");
        setPrescFile(null);
        toast({
          title: "Prescription Uploaded",
          description: "Prescription uploaded successfully",
          variant: "success"
        })
      }
    });

  };
  const handleLRUpload = async () => {
    if (!LRfile) {
      alert("Please select a file first.");
      return;
    }

    // Create a FormData object
    const sanitizedFileName = LRfile.name.replace(/\s+/g, "_"); 
    const formData = new FormData();
    formData.append("file", new File([LRfile], sanitizedFileName, { type: LRfile.type })); // Append the file with a field name "file"
    formData.append("name", "LR_file");
    formData.append("user_name", username);
    formData.append("test_name", testName);
    formData.append("test_date",testDate)

    //Sending via Axios
    await sendfileRequest(formData);
    toast({
      title: `Lab Report uploaded successfully`,
      description: "Your document has been added to your records.",
    });
    if (LRfileInputRef.current) {
      LRfileInputRef.current.value = "";
    }
    setTestName('');
    setTestDate('');
    setLRfile(null);
  };
  const handleMedUpload = async () => {
    const formData = new FormData();

    formData.append("medicine_name", medicineName);
    formData.append("username", username);
    formData.append("dosage", dosage);
    formData.append("timing", timing);
    formData.append("prescribed_by",prescribedBy);
    formData.append("exp_date",expDate);
    formData.append("stock", stock);

    //Sending via Axios
    await uploadmedicationRequest(formData);
    toast({
      title: `Lab Report uploaded successfully`,
      description: "Your document has been added to your records.",
    });
    if (LRfileInputRef.current) {
      LRfileInputRef.current.value = "";
    }
    setmedicineName('');
    setdosage('');
    settiming('');
    setprescribedBy('');
    setexpDate('');
    setstock('');
  };

  const {data, status, error} = usePrescriptions(username);
  console.log(data);
  const LabReports:LabReport[] = useLabReports();
  const Medications:Medication[] = useMedications();
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-primary">Health Records Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="prescriptions" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 gap-4">
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="lab-reports">Lab Reports</TabsTrigger>
            <TabsTrigger value="medicines">Medicine Management</TabsTrigger>
          </TabsList>

          <TabsContent value="prescriptions" className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h3 className="font-medium">Recent Prescriptions</h3>
                <div className="grid gap-2 max-h-60 overflow-y-auto p-2 border rounded-lg">
                {status === "pending" ? (
                  <div>loading</div>
                ): status === "error" ? (
                  <div>Error</div>
                ): (
                  // {prescriptions.map((prescription, index) => (

                  
                  // ))}
                  data.map((prescription, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                      <div>
                        <p className="font-medium">{`Dr. ${prescription.doctorName || "Unknown Doctor"}`}</p>
                        <p className="text-sm text-gray-600">
                          {prescription.prescribedDate ? `Visit Date: ${new Date(prescription.prescribedDate).toLocaleDateString()}` : "Visit Date: Not Available"}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => openPdf(prescription.url)}>
                        <FileText className="h-4 w-4 mr-2" />
                        {getFileName(prescription.url)}
                      </Button>
                    </div>
                  ))
                ) }
                </div>
              </div>

              <div className="space-y-4 border-t pt-4">
                <h3 className="font-medium">Upload New Prescription</h3>
                <div className="space-y-2">
                  <Label>Doctor Name</Label>
                  <Input 
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    placeholder="Enter doctor's name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Visit Date</Label>
                  <Input 
                    type="date"
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Upload Prescription File</Label>
                  <input 
                    ref={PrescfileInputRef}
                    className= "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    id="Prescriptions" type="file"  accept=".pdf,.jpg,.png" onChange={handlePrescFileChange}  />
                    
                  <p className="text-xs text-muted-foreground">Supported formats: PDF, JPG, PNG</p>
                </div>
                <Button
                  className="w-full"
                  disabled={!Prescfile || !doctorName || !visitDate || uploadstatus === "pending"}
                  onClick={handlPrescUpload}
                >
                  {uploadstatus === "pending" ? (
                    <div className="flex items-center justify-center h-screen">
                      <Loader2 className="animate-spin w-16 h-16 text-gray-500" />
                    </div>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Prescription
                    </>
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="lab-reports" className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h3 className="font-medium">Recent Lab Reports</h3>
                <div className="grid gap-2 max-h-60 overflow-y-auto p-2 border rounded-lg">
                {LabReports.map((LR, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-medium">{`Dr. ${LR.testName || "Unknown Doctor"}`}</p>
                      <p className="text-sm text-gray-600">
                        {LR.testDate ? `Visit Date: ${new Date(LR.testDate).toLocaleDateString()}` : "Visit Date: Not Available"}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => openPdf(LR.url)}>
                      <FileText className="h-4 w-4 mr-2" />
                      {getFileName(LR.url)}
                    </Button>
                  </div>
                ))}
                </div>
              </div>

              <div className="space-y-4 border-t pt-4">
                <h3 className="font-medium">Upload New Lab Report</h3>
                <div className="space-y-2">
                  <Label>Test Name</Label>
                  <Input 
                    value={testName}
                    onChange={(e) => setTestName(e.target.value)}
                    placeholder="Enter test name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Test Date</Label>
                  <Input 
                    type="date"
                    value={visitDate}
                    onChange={(e) => setTestDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Upload Lab Report File</Label>
                  <input 
                    ref={LRfileInputRef}
                    className= "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    id="Lab_Report" type="file"  accept=".pdf,.jpg,.png" onChange={handleLRFileChange} />
                    
                  <p className="text-xs text-muted-foreground">Supported formats: PDF, JPG, PNG</p>
                </div>
                <Button  className="w-full" disabled={!LRfile || !testName || !testDate} onClick={handleLRUpload}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Lab Report
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="medicines" className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h3 className="font-medium">Current Medicines</h3>
                <div className="grid gap-2">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="grid gap-2 max-h-60 overflow-y-auto p-2 border rounded-lg">
                      {Medications.map((Meds, index) => (
                        <div key={index} className="p-3 bg-gray-50">
                        <div className="flex items-center gap-2">
                          <Pill className="h-4 w-4 text-primary" />
                          <p className="font-medium">{Meds.medicineName}</p>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                          <p>{Meds.dosage}</p>
                          <p>{Meds.timing}</p>
                          <p>{Meds.prescribedBy}</p>
                          <p>{Meds.expiry}</p>
                          <p className="mt-1 text-amber-600">{Meds.stock} Remaining</p>
                        </div>
                        </div>
                     ))}
                  </div>
                  </div>  
                </div>
                <div className="space-y-4 border-t pt-4">
                <h3 className="font-medium">Upload New Medications</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Medicine Name</Label>
                    <Input 
                      value={medicineName}
                      onChange={(e) => setmedicineName(e.target.value)}
                      placeholder="Enter Medicine Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Dosage</Label>
                    <Input 
                      value={dosage}
                      onChange={(e) => setdosage(e.target.value)}
                      placeholder="Enter Dosage"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Prescribed By</Label>
                    <Input 
                      value={prescribedBy}
                      onChange={(e) => setprescribedBy(e.target.value)}
                      placeholder="Enter Doctor's Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>timing</Label>
                    <Input 
                      value={timing}
                      onChange={(e) => settiming(e.target.value)}
                      placeholder="Enter Timing"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Expiry Date</Label>
                    <Input 
                      type="date"
                      value={expDate}
                      onChange={(e) => setexpDate(e.target.value)}
                      placeholder="Enter Expiry Date"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Stock Left</Label>
                    <Input 
                      value={stock}
                      onChange={(e) => setstock(e.target.value)}
                      placeholder="Enter Remaining Stock"
                    />
                  </div>
                </div>
                <Button  className="w-full" disabled={!medicineName || !dosage || !timing || !prescribedBy || !expDate || !stock} onClick={handleMedUpload}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Medicine
                </Button>
              </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};