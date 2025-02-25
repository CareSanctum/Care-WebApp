
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import useTickets from '@/hooks/use-tickets';
import { Button } from "@/components/ui/button";


const changeDateFormat = (date: string): string => {
  const eventDate = new Date(date);
  const datePart = eventDate.toISOString().split('T')[0];
  const timePart = eventDate.toISOString().split('T')[1].split(':').slice(0, 2).join(':');
  return datePart + " " +  timePart;
}


export const TicketHistory = () => {
  const { tickets } = useTickets();
  // console.log(tickets);
  const [showActive, setShowActive] = useState(true);

  // Filter tickets based on status
  const filteredTickets = tickets
    .filter(ticket => showActive ? ticket.status === 'OPEN' : ticket.status === 'CLOSED')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold text-primary">Support Tickets</CardTitle>
        <div className="flex gap-2">
          <Button
            variant={showActive ? "default" : "outline"}
            onClick={() => setShowActive(true)}
            size="sm"
          >
            Active
          </Button>
          <Button
            variant={!showActive ? "default" : "outline"}
            onClick={() => setShowActive(false)}
            size="sm"
          >
            Inactive
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] pr-4">
          {filteredTickets.length === 0 ? (
            <div className="text-center text-sm text-muted-foreground py-8">
              No {showActive ? 'active' : 'inactive'} tickets found
            </div>
          ) : (
            filteredTickets.map((ticket) => (
              <div key={ticket.id} className="mb-4 p-3 border rounded-lg bg-white">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-sm">{ticket.title}</h4>
                    <span className="text-xs text-muted-foreground">#{ticket.id}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground">
                      {changeDateFormat(ticket.date)}
                    </p>
                  </div>
                  {/* <p className="text-xs text-muted-foreground">Category: {ticket.category}</p> */}
                </div>
                <Badge variant={ticket.status === 'OPEN' ? 'secondary' : 'outline'}>
                  {ticket.status}
                </Badge>
              </div>
            </div>
            ))
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};