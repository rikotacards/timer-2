import { Button, ButtonProps, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import React from 'react';
interface ConfirmationDialogProps {
    open: boolean;
    onClose: () => void;
    title: string;
    submitName: string;
    submitFn: () => void;
    text: string;
    buttonProps?: ButtonProps

}
export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({buttonProps, title, open, onClose, text, submitName, submitFn}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>

            <Typography>{text}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button color={buttonProps?.color} onClick={submitFn}>{submitName}</Button>
            </DialogActions>

        </Dialog>
    )
}