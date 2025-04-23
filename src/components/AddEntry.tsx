import React from 'react';
import { useActiveEntries } from '../hooks/queries/useActiveEntry';
import { NonActiveEntryForm } from './NonActiveEntryForm';
import { ActiveEntry } from './ActiveEntry';

export const AddEntry: React.FC = () => {
    const activeEntry = useActiveEntries();
    if(activeEntry.isLoading){
        return null
    }
    const isActive = !!activeEntry.data?.length


    if(isActive && activeEntry?.data?.[0]){
        //activ
        return <ActiveEntry entry={activeEntry.data?.[0]}/>
    }
    return (
       <NonActiveEntryForm/>
    )
}