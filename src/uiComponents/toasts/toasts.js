import { toast } from 'react-toastify';

export const toastError = (message) => {
    toast(
        message,
        {
            autoClose: false,
            type: toast.TYPE.ERROR,
        }
    )
}
