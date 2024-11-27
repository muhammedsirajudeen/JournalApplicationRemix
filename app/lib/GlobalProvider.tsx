import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { JournalEntry } from '~/routes/journal';
import {produce} from "immer"
import { color } from '~/components/journalDialog';
interface StoreState {
  authenticated: boolean;
  setAuth: (status:boolean) => void;
  setJournal:(journals:JournalEntry)=>void
  setJournals:Dispatch<SetStateAction<JournalEntry[]>>
  journals:JournalEntry[]
  updateJournal:UpdateJournal
  setUpdateJournal:Dispatch<SetStateAction<UpdateJournal>>
  isUpdate:boolean
  setUpdate:Dispatch<SetStateAction<boolean>>
}

const StoreContext = createContext<StoreState | undefined>(undefined);

interface StoreProviderProps {
  children: ReactNode;
}

interface UpdateJournal{
  color:color
  journal:string
  id:string
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [journals,setJournals]=useState<JournalEntry[]>([])
  const [updateJournal,setUpdateJournal]=useState<UpdateJournal>({journal:"",color:"bg-white",id:""})
  const setAuth=(authStatus:boolean)=>setAuthenticated(authStatus)
  const [isUpdate,setUpdate]=useState<boolean>(false)
  const setJournal = (journal: JournalEntry) => {
    setJournals((prev) =>
      produce(prev, (draft) => {
        draft.push(journal); // Mutate the draft
      })
    );
  };
  return (
    <StoreContext.Provider value={{ authenticated, setAuth,journals,setJournal,setJournals,updateJournal,setUpdateJournal, isUpdate, setUpdate }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreState => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
