import React from 'react'
import { useActiveEntries } from '../hooks/queries/useActiveEntry';
import { ActiveEntry } from './ActiveEntry';
import { NonActiveEntryNew } from './NonActiveEntryNew';
import { useIsSmall } from '../utils/useIsSmall';

export const NewEntry: React.FC = () => {
     const activeEntry = useActiveEntries();
     
      const ae = activeEntry?.data?.[0];
      const hasActiveEntry = !!activeEntry.data?.length;

    if(hasActiveEntry && ae !== undefined){
        return <ActiveEntry entry={ae}/>
    }
    return <NonActiveEntryNew/>
}