// TypeScript interfaces for Firestore collections
export interface User {
  id?: string;
  email: string;
  phone: string;
  name: string;
  role: string;
  clubId: string;
  isApproved: boolean;
  createdAt: Date;
}

export interface Earning {
  id?: string;
  clubId: string;
  date: Date;
  amount: number;
  source: "donation" | "sponsorship" | "ticket";
  description: string;
  paymentMethod: "cash" | "upi" | "bank";
  createdAt: Date;
}

export interface Expense {
  id?: string;
  clubId: string;
  date: Date;
  amount: number;
  category: "pandal" | "idol" | "food" | "lighting";
  vendor: string;
  description: string;
  paymentMethod: string;
  createdAt: Date;
}

export interface Sponsorship {
  id?: string;
  clubId: string;
  sponsorName: string;
  contact: string;
  amount: number;
  date: Date;
  type: "banner" | "event" | "other";
  status: "pending" | "received";
  createdAt: Date;
}

export interface Member {
  id?: string;
  clubId: string;
  name: string;
  contact: string;
  address: string;
  contributionAmount: number;
  contributionType: "monetary" | "in-kind";
  status: "active" | "inactive";
  createdAt: Date;
}

export interface FoodDistribution {
  id?: string;
  clubId: string;
  date: Date;
  foodType: string;
  quantity: number;
  peopleServed: number;
  cost: number;
  location: string;
  createdAt: Date;
}

export interface Budget {
  id?: string;
  clubId: string;
  category: string;
  plannedAmount: number;
  actualAmount: number;
  createdAt: Date;
}

export interface Role {
  id?: string;
  name: "member" | "ec_member" | "finance_member";
  canRead: boolean;
  canWrite: boolean;
  description?: string;
}
