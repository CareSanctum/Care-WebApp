
export interface ReferralUser {
  id: string;
  name: string;
  onboardingStatus: 'completed' | 'pending' | 'failed';
  joinedAt: string;
  earnings: number;
  feedback: {
    rating: number;
    review?: string;
  } | null;
}

export interface Notification {
  id: string;
  userId: string;
  userName: string;
  type: 'success' | 'failure';
  message: string;
  earnings?: number;
  date: string;
  read: boolean;
}
