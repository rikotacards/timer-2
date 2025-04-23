import React from 'react';
import { Entry } from '../hooks/queries/useEntries';
import { ActiveEntryRow } from './ActiveEntryRow';

interface ActiveEntryProps {
    entry: Omit<Entry,'end_time'>
}
export const ActiveEntry: React.FC<ActiveEntryProps> = ({entry}) => {
    return (
        <ActiveEntryRow/>
    )
}