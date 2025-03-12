
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { ReferralUser } from '../types';

interface ReferralTableProps {
  users: ReferralUser[];
}

export const ReferralTable: React.FC<ReferralTableProps> = ({ users }) => {
  const [sortField, setSortField] = useState<keyof ReferralUser | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: keyof ReferralUser) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (!sortField) return 0;
    
    let aValue: any = a[sortField];
    let bValue: any = b[sortField];
    
    if (sortField === 'feedback') {
      aValue = a.feedback?.rating || 0;
      bValue = b.feedback?.rating || 0;
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-amber-600 bg-amber-50';
      case 'failed':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const renderStars = (rating: number | undefined) => {
    if (!rating) return null;
    
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < rating ? "text-yellow-500" : "text-gray-300"}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="rounded-md bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('name')}
            >
              User
              {sortField === 'name' && (
                <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
              )}
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('onboardingStatus')}
            >
              Onboarding Status
              {sortField === 'onboardingStatus' && (
                <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
              )}
            </TableHead>
            <TableHead 
              className="cursor-pointer text-right"
              onClick={() => handleSort('earnings')}
            >
              Earnings
              {sortField === 'earnings' && (
                <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
              )}
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('feedback')}
            >
              Feedback
              {sortField === 'feedback' && (
                <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
              )}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                <div>
                  {user.name}
                  <div className="text-xs text-gray-500">
                    Joined {new Date(user.joinedAt).toLocaleDateString()}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.onboardingStatus)}`}>
                  {user.onboardingStatus.charAt(0).toUpperCase() + user.onboardingStatus.slice(1)}
                </span>
              </TableCell>
              <TableCell className="text-right font-semibold">
                {user.onboardingStatus === 'completed' ? `₹${user.earnings}` : '—'}
              </TableCell>
              <TableCell>
                {user.feedback ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="cursor-help">
                          {renderStars(user.feedback.rating)}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          {user.feedback.review || "No written feedback provided"}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <span className="text-gray-400">No feedback</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
