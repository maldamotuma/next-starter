import axios from "@/config/axios";
import { statusTypes } from "@/config/types"
import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { AxiosRequestConfig } from "axios";
import { useSnackbar } from "notistack";
import { useState } from "react"

export const useRemoteCall = () => {
    const [status, setStatus] = useState<statusTypes>("idle");
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const post = async (url: string, options: {
        formdata?: FormData;
        successCallBack?: () => void;
        failCallBack?: () => void;
        successMessage?: string;
        failMessage?: string;
        ky?: string;
        requestConfig?: AxiosRequestConfig
    }) => {
        setStatus("pending");
        try {
            const res = await axios.post(url, options.formdata, options.requestConfig);
            setStatus("idle");
            if (res.data.success === 1) {
                if(options?.successCallBack) options?.successCallBack
                else if(options?.successMessage) enqueueSnackbar(options?.successMessage, {
                    variant: "success",
                    action: <IconButton onClick={() => closeSnackbar()}><Close /></IconButton>,
                    anchorOrigin: {
                        vertical: "top",
                        horizontal: "right"
                    }
                })
                if(options?.ky) return res.data[options.ky]
                else return res.data.result
            }else if(res.data.message) enqueueSnackbar(res.data.message, {
                variant: "info",
                    action: <IconButton onClick={() => closeSnackbar()}><Close /></IconButton>,
                    anchorOrigin: {
                    vertical: "top",
                    horizontal: "right"
                }
            })
        } catch (error: any) {
            setStatus("rejected");
            if (error.response?.status === 422) {
                enqueueSnackbar(error.response?.data.message, {
                    variant: "error",
                    action: <IconButton onClick={() => closeSnackbar()}><Close /></IconButton>,
                    anchorOrigin: {
                    vertical: "top",
                    horizontal: "right"
                }
                });
            }else {
                enqueueSnackbar("Something Went Wrong", {
                    variant: "error",
                    action: <IconButton onClick={() => closeSnackbar()}><Close /></IconButton>,
                    anchorOrigin: {
                    vertical: "top",
                    horizontal: "right"
                }
                })
            }
            return null;
        }

    }

    const get = async (url: string, options: {
        successCallBack?: () => void;
        failCallBack?: () => void;
        successMessage?: string;
        failMessage?: string;
        ky?: string;
        requestConfig?: AxiosRequestConfig
    }) => {
        setStatus("pending");
        try {
            const res = await axios.get(url, options.requestConfig);
            setStatus("idle");
            if (res.data.success === 1) {
                if(options?.successCallBack) options?.successCallBack
                else if(options?.successMessage) alert(options?.successMessage)
                if(options?.ky) return res.data[options.ky]
                else return res.data.result
            }else if(res.data.message) alert(res.data.message)
        } catch (error: any) {
            setStatus("rejected");
            if (error.response?.status === 422) {
                alert(error.response?.data.message);
            }else {
                alert("Something Went Wrong")
            }
            return null;
        }

    }

    return {
        status,
        axios: {
            post,
            get
        }
    }
}