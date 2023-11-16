import axios from "@/config/axios";
import { statusTypes } from "@/config/types"
import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { AxiosRequestConfig } from "axios";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react"

export const useRemoteCall = () => {
    const [status, setStatus] = useState<statusTypes>("idle");
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const post = async (url: string, options?: {
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
            const res = await axios.post(url, options?.formdata, options?.requestConfig);
            setStatus("idle");
            if (res.data.success === 1) {
                if (options?.successCallBack) options?.successCallBack()
                enqueueSnackbar(options?.successMessage || "Success", {
                    variant: "success",
                    action: <IconButton onClick={() => closeSnackbar()}><Close /></IconButton>,
                    anchorOrigin: {
                        vertical: "top",
                        horizontal: "right"
                    }
                })
                if (options?.ky) return res.data[options.ky]
                else return res.data.result
            } else if (res.data.message) enqueueSnackbar(res.data.message, {
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
            } else {
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

    const get = async (url: string, options?: {
        successCallBack?: () => void;
        failCallBack?: () => void;
        successMessage?: string;
        failMessage?: string;
        ky?: string;
        requestConfig?: AxiosRequestConfig
    }) => {
        setStatus("pending");
        try {
            const res = await axios.get(url, options?.requestConfig);
            setStatus("idle");
            if (res.data.success === 1) {
                if (options?.successCallBack) options?.successCallBack()
                if (options?.successMessage) {
                    enqueueSnackbar(options?.successMessage, {
                        variant: "success",
                        action: <IconButton onClick={() => closeSnackbar()}><Close /></IconButton>,
                        anchorOrigin: {
                            vertical: "top",
                            horizontal: "right"
                        }
                    })
                }
                if (options?.ky) return res.data[options.ky]
                else return res.data.result
            } else if (res.data.message) {
                enqueueSnackbar(res.data.message, {
                    variant: "info",
                    action: <IconButton onClick={() => closeSnackbar()}><Close /></IconButton>,
                    anchorOrigin: {
                        vertical: "top",
                        horizontal: "right"
                    }
                })
            }
        } catch (error: any) {
            setStatus("rejected");
            enqueueSnackbar("Something Went Wrong", {
                variant: "error",
                action: <IconButton onClick={() => closeSnackbar()}><Close /></IconButton>,
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "right"
                }
            })
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

export const useInitialCall = (url: string, options?: {
    successCallBack?: () => void;
    failCallBack?: () => void;
    successMessage?: string;
    failMessage?: string;
    ky?: string;
    requestConfig?: AxiosRequestConfig
}) => {
    const { axios, status } = useRemoteCall();
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        axios.get(url, options).then(res => {
            setData(res)
        });
        return () => {

        }
    }, []);

    return {
        status,
        data,
        setData
    }

}