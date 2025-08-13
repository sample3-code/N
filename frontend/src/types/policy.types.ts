export interface Policy {
  id: string;
  customerId: string;
  customerName: string;
  type: PolicyType;
  premium: number;
  duration: number;
  startDate: Date;
  endDate: Date;
  status: PolicyStatus;
  employeeId?: string;
  managerId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type PolicyType = 'life' | 'health' | 'auto' | 'home' | 'business';
export type PolicyStatus = 'active' | 'pending' | 'expired' | 'cancelled' | 'under_review';

export interface PolicyChangeRequest {
  id: string;
  policyId: string;
  customerId: string;
  requestType: 'change' | 'cancel';
  requestDetails: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: Date;
  reviewedBy?: string;
  reviewedAt?: Date;
}