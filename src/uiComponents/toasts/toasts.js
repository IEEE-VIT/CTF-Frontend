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

export const toastSuccess = (message) => {
    toast(
        message,
        {
            autoClose: 5000,
            type: toast.TYPE.SUCCESS
        }
    )
}
