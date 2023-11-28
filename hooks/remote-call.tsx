import axios from "@/config/axios";
import { statusTypes } from "@/config/types"
import { Close } from "@mui/icons-material";
import { Box, Button, Dialog, CardHeader, IconButton, Alert } from "@mui/material";
import { AxiosRequestConfig } from "axios";
import { bindDialog, bindTrigger, usePopupState } from "material-ui-popup-state/hooks";
import { useSnackbar } from "notistack";
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react"

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

interface UseInitialCall<T> {
    status: statusTypes;
    data: T;
    setData: Dispatch<SetStateAction<T>>
}

export const useInitialCall = <T,>(url: string, initialValue: T, options?: {
    successCallBack?: () => void;
    failCallBack?: () => void;
    successMessage?: string;
    failMessage?: string;
    ky?: string;
    requestConfig?: AxiosRequestConfig
}): UseInitialCall<T> => {
    const { axios, status } = useRemoteCall();
    const [data, setData] = useState<T>(initialValue);

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

interface useInitialList<T> {
    status: statusTypes;
    data: T[];
    setData: Dispatch<SetStateAction<T[]>>;
    alterData(dt: T, edit?: boolean): void;
    handleEdit(dt: T): void;
    handleDelete(data_id: number): void;
    renderDialog(copy: {
        txt: {
            btn_txt: string;
            header: string;
        },
        frm: ReactNode
    }): ReactNode;
    edit: T | null;
    close(): void;
    renderList(nd: ReactNode | ReactNode[], ldng?: ReactNode | ReactNode[]): ReactNode;
}

interface IdentifierProp {
    id: number;
}

type RequestConfigType = {
    successCallBack?: () => void;
    failCallBack?: () => void;
    successMessage?: string;
    failMessage?: string;
    ky?: string;
    requestConfig?: AxiosRequestConfig
}

export const useInitialList = <T extends IdentifierProp>(url: string, options?: RequestConfigType): useInitialList<T> => {
    const { data, setData, status } = useInitialCall<T[]>(url, [], options);
    const [edit, setEdit] = useState<T | null>(null); // Stores Admin to be edited
    const pps = usePopupState({ variant: "dialog" });

    useEffect(() => {
        if (!pps.isOpen) setEdit(null)

        return () => {

        }
    }, [pps.isOpen]);

    const alterData = (dt: T, edit?: boolean) => {
        if (edit) {
            setData(prev => prev.map(pdt => pdt.id === dt.id ? dt : pdt));
        } else {
            setData(prev => ([dt, ...prev]));
        }
    }

    const handleEdit = (dt: T) => {
        pps.open();
        setEdit(dt);
    }

    const handleDelete = (data_id: number) => {
        setData(prev => prev.filter(pr => pr.id !== data_id))
    }

    const renderDialog = (copy: {
        txt: {
            btn_txt?: string;
            header: string;
        },
        frm: ReactNode
    }) => (
        <>
            {
                copy.txt.btn_txt &&
                <Button {...bindTrigger(pps)}>{copy.txt.btn_txt}</Button>
            }
            <Dialog {...bindDialog(pps)} onClose={() => { }}>
                <CardHeader
                    title={copy.txt.header}
                    action={<IconButton onClick={pps.close}><Close /></IconButton>}
                />
                <Box sx={{ p: 3 }}>
                    {
                        copy.frm
                    }
                </Box>
            </Dialog>
        </>
    )

    const renderList = (nd: ReactNode | ReactNode[], ldng?: ReactNode | ReactNode[]) => {
        switch (status) {
            case "pending":
                return ldng || <>Loading...</>
            case "idle":
                return data.length ? nd : <Alert severity="info">No Data Found</Alert>;
            default:
                return <>Something Went Wrong.</>;
        }
    }

    return {
        status,
        data,
        setData,
        alterData,
        handleEdit,
        handleDelete,
        renderDialog,
        edit,
        close: pps.close,
        renderList
    }
}