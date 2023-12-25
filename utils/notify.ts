import { ToastContainer, toast } from 'react-toastify';

export const notify = (type: "success" | "error", message: string): void => {
    toast[type](message); // Removed the extra dots and fixed the syntax
};