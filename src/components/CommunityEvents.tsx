import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { Event } from '@/store/slices/eventSlice';
import useEvents from '@/hooks/use-events';
import { eventNames } from 'process';
import { useAppSelector } from '@/store/hooks';
import { registereventRequest } from '@/requests/registereventRequest';

const changeDateFormat = (date: string): string => {
  const eventDate = new Date(date);
  const datePart = eventDate.toISOString().split('T')[0];
  const timePart = eventDate.toISOString().split('T')[1].split(':').slice(0, 2).join(':');
  return datePart + " " +  timePart;
}
export const CommunityEvents = () => {
  const { toast } = useToast();
  const {events} = useEvents();
  const {username} = useAppSelector((state) => state.auth);

  const handleRegister = async (eventId: string) => {
    const response = await registereventRequest(username, eventId);
    toast({
      title: "Registration Successful",
      description: "You have been registered for the event. Check your email for details.",
    });
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-primary">Community Events</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          {events.map((event) => (
            <div key={event.id} className="mb-4 p-4 border rounded-lg bg-white">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">{event.title}</h4>
                  <p className="text-sm text-muted-foreground">{event.location}</p>
                  <p className="text-sm text-muted-foreground">{changeDateFormat(event.date)}</p>
                </div>
                {/* <Badge variant={event.status === 'upcoming' ? 'secondary' : 'outline'}>
                  {event.status}
                </Badge> */}
              </div>
              {
                <Button 
                  className="w-full mt-2" 
                  variant="outline"
                  onClick={() => handleRegister(event.id)}
                >
                  Register
                </Button>
              }
              {/* {event.status === 'past' && event.registered && (
                <Badge variant="outline" className="mt-2">
                  Attended
                </Badge>
              )} */}
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};