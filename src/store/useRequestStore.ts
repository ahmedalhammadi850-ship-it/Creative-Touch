import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type RequestStatus = 'pending' | 'approved' | 'rejected';
export type RequestType = 'activation' | 'subscription';

export interface AppRequest {
  id: string;
  type: RequestType;
  userId?: string;
  userName: string;
  userPhone: string;
  userEmail?: string;
  templateName?: string;
  plan?: string;
  planId?: string;
  imageBase64?: string;
  imageName?: string;
  status: RequestStatus;
  createdAt: string;
  respondedAt?: string;
}

interface RequestState {
  requests: AppRequest[];
  addRequest: (req: Omit<AppRequest, 'id' | 'status' | 'createdAt'>) => string;
  updateStatus: (id: string, status: RequestStatus) => void;
  getByUser: (userId: string) => AppRequest[];
}

export const useRequestStore = create<RequestState>()(
  persist(
    (set, get) => ({
      requests: [],
      addRequest: (req) => {
        const id = Date.now().toString();
        const newReq: AppRequest = {
          ...req,
          id,
          status: 'pending',
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ requests: [newReq, ...state.requests] }));
        return id;
      },
      updateStatus: (id, status) =>
        set((state) => ({
          requests: state.requests.map((r) =>
            r.id === id ? { ...r, status, respondedAt: new Date().toISOString() } : r
          ),
        })),
      getByUser: (userId) => get().requests.filter((r) => r.userId === userId),
    }),
    { name: 'requests-storage' }
  )
);
