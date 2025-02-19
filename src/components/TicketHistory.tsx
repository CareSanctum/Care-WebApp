import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTickets } from '@/hooks/use-tickets';


type Ticket = {
  id: string;
  title: string;
  status: 'open' | 'closed';
  date: string;
  category: string;
};

export const TicketHistory = () => {
  const { tickets } = useTickets();
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-primary">Support Tickets</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] pr-4">
        {tickets.map((ticket) => (
            <div key={ticket.id} className="mb-4 p-3 border rounded-lg bg-white">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-sm">{ticket.title}</h4>
                  <p className="text-xs text-muted-foreground">{ticket.date}</p>
                </div>
                <Badge variant={ticket.status === 'open' ? 'secondary' : 'outline'}>
                  {ticket.status}
                </Badge>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};