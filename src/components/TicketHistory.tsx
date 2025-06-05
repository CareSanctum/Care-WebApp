
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import useTickets from '@/hooks/use-tickets';
import { Button } from "@/components/ui/button";


const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day} ${month} ${year} ${hours}:${minutes}`;
};


export const TicketHistory = () => {
  const { tickets } = useTickets();
  // console.log(tickets);
  const [showActive, setShowActive] = useState(true);

  // Filter tickets based on status
  const filteredTickets = tickets
    .filter(ticket => showActive ? ticket.status === 'OPEN' : ticket.status === 'CLOSED')
    .sort((a, b) => new Date(b.opened_at).getTime() - new Date(a.opened_at).getTime());

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
                      {ticket.status === 'OPEN' ? `${formatDate(ticket.opened_at)}` : `${formatDate(ticket.opened_at)} – ${formatDate(ticket.closed_at)}`}
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