import { ChangeEvent, FormEvent, useState } from "react";
import { useRemoteCall } from "./remote-call";
import { useSnackbar } from "notistack";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

export const useEmailSubscribe = () => {
    const [email, setEmail] = useState<string>("");
    const { axios, status } = useRemoteCall();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            enqueueSnackbar("Please Provide Valid Email Address", {
                variant: "info",
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "right"
                },
                action: <IconButton onClick={() => closeSnackbar()}><Close /></IconButton>
            });
            return false;
        }
        const formdata = new FormData();
        formdata.append("email", email);
        axios.post("/subscribe", {
            formdata,
            successMessage: "You have successfully Subscribed to our Email List!"
        });
    }

    return {
        handleChange,
        handleSubmit,
        loading: status === "pending"
    }
}