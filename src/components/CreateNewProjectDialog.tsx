import {  Button, Dialog, TextField } from '@mui/material';
import React from 'react';
import { useAddProject } from '../hooks/mutations/useAddProject.ts';
interface CreateNewProjectDialog {
    open: boolean;
    onClose: () => void;
}
export const CreateNewProjectDialog: React.FC<CreateNewProjectDialog> = ({open, onClose}) => {
    const [name, setName] = React.useState('')
    const addProject = useAddProject();
    const onClick = async() => {
        await addProject.mutateAsync({
            name
        })
        onClose()
    }
    return (
        <Dialog open={open} onClose={onClose}>
        
            <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Project name'/>
            <Button onClick={onClick}>Add</Button>

        </Dialog>
    )
}