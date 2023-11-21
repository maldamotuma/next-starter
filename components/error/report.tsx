"use client"

import { useRemoteCall } from "@/hooks/remote-call";
import { useValidator } from "@malda/react-validator";
import { Home } from "@mui/icons-material";
import { Box, Button, CardHeader, Container, Divider, Grid, Stack, TextField } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, FunctionComponent } from "react";

interface ErrorReportFormProps {
    error: Error & { digest: string };
    reset(): void;
}

const ErrorReportForm: FunctionComponent<ErrorReportFormProps> = ({ error, reset }) => {
    const { validate } = useValidator("report-error", {
        rules: {
            when: ['required'],
            description: ['required']
        }
    });
    const { status, axios } = useRemoteCall();
    const router = useRouter();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        validate(async () => {
            const formdata = new FormData(e.currentTarget);
            await axios.post("/report-error", {
                formdata,
                successMessage: "Thank you a lot for being our part on improving our system!!",
                successCallBack() {
                    router.back();
                },
            })
        });
    }

    return (
        <Box sx={{
            maxWidth: "1100px"
        }}>
            <Stack direction={"row"} sx={{ width: "100%", alignItems: "center" }} gap={5}>
                <Box sx={{
                    flex: 1,
                    // maxWidth: 400
                }}>
                    <Box
                        component="img"
                        alt={""}
                        src="/error.png"
                        sx={{
                            width: "100%"
                        }}
                    />
                </Box>
                <Box sx={{
                    flex: 1
                }}>
                    <CardHeader
                        title={"Something Went Wrong!"}
                        subheader={"Hel us Improving Our System"}
                        sx={{
                            px: 0
                        }}
                    />
                    <Grid
                        id={"report-error"}
                        component={"form"}
                        onSubmit={handleSubmit}
                        container spacing={2}>
                        <input
                            type="hidden"
                            readOnly
                            value={error.message}
                            name="message"
                        />
                        <input
                            type="hidden"
                            readOnly
                            value={error?.name}
                            name="name"
                        />
                        <Grid item xs={12} id={"input-when"}>
                            <TextField
                                fullWidth
                                placeholder="When Editing Profile"
                                label={"Error Happen When"}
                                name="when"
                            />
                        </Grid>
                        <Grid item xs={12} id="input-description">
                            <TextField
                                fullWidth
                                placeholder="description here..."
                                label="Description"
                                multiline
                                rows={5}
                                name="description"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                disabled={status === "pending"}
                                variant="contained" type="submit">
                                {
                                    status === "pending" ?
                                        "Submitting..."
                                        :
                                        "Submit"
                                }
                            </Button>
                        </Grid>
                    </Grid>
                    <Divider sx={{ mt: 3 }} />
                    <Box sx={{ display: "flex", justifyContent: "space-between", pt: 2 }}>
                        <Button
                            component={Link}
                            href={"/"}
                            startIcon={<Home />}>Goto Home</Button>
                        <Button variant="outlined" onClick={reset}>Reset</Button>
                    </Box>
                </Box>
            </Stack>
        </Box>
    );
}

export default ErrorReportForm;