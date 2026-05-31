import { create } from 'zustand'

export type ViewMode = 'borrower' | 'lender'
export type TxState = 'idle' | 'extracting' | 'extracted' | 'matching' | 'matched' | 'funding' | 'funded'

interface StoreState {
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
  
  txState: TxState
  setTxState: (state: TxState) => void
  
  equipmentData: any | null
  setEquipmentData: (data: any) => void
  
  lenders: any[]
  setLenders: (lenders: any[]) => void
  
  wireReceipt: any | null
  setWireReceipt: (receipt: any) => void
  
  isEntityVerified: boolean
  setIsEntityVerified: (verified: boolean) => void

  hasCompletedLenderOnboarding: boolean
  setHasCompletedLenderOnboarding: (completed: boolean) => void

  activeLenderTab: string
  setActiveLenderTab: (tab: string) => void
  
  reset: () => void
}

export const useStore = create<StoreState>((set) => ({
  viewMode: 'borrower',
  setViewMode: (mode) => set({ viewMode: mode }),
  
  txState: 'idle',
  setTxState: (state) => set({ txState: state }),
  
  equipmentData: null,
  setEquipmentData: (data) => set({ equipmentData: data }),
  
  lenders: [],
  setLenders: (lenders) => set({ lenders: lenders }),
  
  wireReceipt: null,
  setWireReceipt: (receipt) => set({ wireReceipt: receipt }),
  
  isEntityVerified: false,
  setIsEntityVerified: (verified) => set({ isEntityVerified: verified }),
  
  hasCompletedLenderOnboarding: false,
  setHasCompletedLenderOnboarding: (completed) => set({ hasCompletedLenderOnboarding: completed }),
  
  activeLenderTab: 'active_deals',
  setActiveLenderTab: (tab) => set({ activeLenderTab: tab }),

  reset: () => set({ 
    txState: 'idle', 
    equipmentData: null, 
    lenders: [], 
    wireReceipt: null,
    isEntityVerified: false,
    hasCompletedLenderOnboarding: false,
    activeLenderTab: 'active_deals'
  })
}))
