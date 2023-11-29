import { useRemoteCall } from "@/hooks/remote-call";
import { rulesAndMessagedType, useValidator } from "@malda/react-validator";
import { LoadingButton } from "@mui/lab";
import { Accordion, AccordionDetails, AccordionSummary, Box, Paper, Stack, TextField } from "@mui/material";
import { FormEvent, FunctionComponent } from "react";

interface ContactFormProps {
    formId: string;
}

const rules: rulesAndMessagedType = {
    rules: {
        email: ['required', 'email'],
        name: ['required', 'full_name'],
        subject: ['required'],
        message: ['required']
    }
}
const ContactForm: FunctionComponent<ContactFormProps> = ({ formId }) => {
    const { validate } = useValidator(formId, rules);
    const { axios, status } = useRemoteCall();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        validate(() => {
            const formdata = new FormData(e.currentTarget);
            axios.post("/contact", {
                formdata,
                successMessage: "I have Received Your Form. Thankyou!"
            });
        })
    }


    return (
        <Stack
            component={"form"}
            onSubmit={handleSubmit}
            gap={2}
            id={formId}
        >
            <div id="input-email">
                <TextField
                    placeholder={"example@mail.com"}
                    label={"Email"}
                    fullWidth
                    name={"email"}
                />
            </div>
            <div id="input-name">
                <TextField
                    placeholder={"John Doe"}
                    label={"Full Name"}
                    fullWidth
                    name={"name"}
                />
            </div>
            <div id="input-subject">
                <TextField
                    placeholder={"I need to hire you"}
                    label={"Subject"}
                    fullWidth
                    name={"subject"}
                />
            </div>
            <div id="input-message">
                <TextField
                    placeholder={"write here..."}
                    label={"message"}
                    fullWidth
                    name={"message"}
                    multiline
                    rows={3}
                />
            </div>
            <div id="input-contact_methode">
                <TextField
                    placeholder={"whatsapp ##########"}
                    label={"Preferred Contact Methode"}
                    fullWidth
                    name={"contact_methode"}
                />
            </div>
            <Box
                sx={{
                    pt: 2
                }}
            >
                <LoadingButton
                    variant={"contained"}
                    type={"submit"}
                    loading={status === "pending"}
                >
                    Submit
                </LoadingButton>
            </Box>
        </Stack>
    );
}

export default ContactForm;