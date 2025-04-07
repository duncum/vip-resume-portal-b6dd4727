
import React, { createContext, useContext } from 'react';
import { useFormState } from '../hooks';
import { type Candidate } from '@/utils/sheets/types';

// Create context with appropriate types
type FormContextType = ReturnType<typeof useFormState> & {
  isApiKeyOnly: boolean;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ 
  children, 
  onSuccess,
  candidateToEdit,
  isApiKeyOnly
}: { 
  children: React.ReactNode;
  onSuccess?: () => void;
  candidateToEdit?: Candidate;
  isApiKeyOnly: boolean;
}) => {
  const formState = useFormState(onSuccess, candidateToEdit);
  
  return (
    <FormContext.Provider value={{ ...formState, isApiKeyOnly }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
