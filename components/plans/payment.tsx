"use client"

import { useAppSelector } from "@/redux/store";
import { Close, DoneAllOutlined, ExpandMoreOutlined } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Alert, Avatar, Box, Button, Card, CardContent, CardHeader, Divider, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Stack, TextField, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useSnackbar } from "notistack";
import { FunctionComponent } from "react";
import { tiers } from "../home/priving";

interface PaymetProcessProps {

}

const PaymetProcess: FunctionComponent<PaymetProcessProps> = () => {
    const user = useAppSelector(state => state.auth.user);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const handleClick = () => {
        enqueueSnackbar("contact payment-issue@tech-scan.com!", {
            variant: "info",
            anchorOrigin: {
                horizontal: "center",
                vertical: "top"
            },
            action: <IconButton onClick={() => closeSnackbar()}><Close /></IconButton>
        })
    }
    return (
        <Stack gap={3}>
            <Card
                variant={"outlined"}
            >
                <CardContent sx={{ p: 3 }}>
                    <CardHeader
                        avatar={<Avatar alt={user?.first_name} sx={{ width: 50, height: 50 }} />}
                        title={"Tech-Scan Membership - pro-plan"}
                        sx={{
                            flexDirection: "column",
                            alignItems: "flex-start",
                            p: 0
                        }}
                        titleTypographyProps={{
                            fontSize: "1.2em",
                            fontWeight: 500,
                            sx: {
                                mt: 1
                            }
                        }}
                    />
                    <Button
                        component={Link}
                        href={"/plans"}
                        variant={"outlined"}
                        size={"small"}
                        sx={{
                            mb: 2
                        }}
                    >Change Plan</Button>
                    <Divider />
                    <ListItemText
                        primary={"Billed Today"}
                        secondary={
                            <Typography sx={{
                                display: "flex",
                                gap: 2
                            }}
                                variant="body2"
                                color={"text.secondary"}
                            >
                                <s>$375</s> <span>$250</span>
                            </Typography>
                        }
                        sx={{
                            p: 2
                        }}
                    />
                    <Accordion
                        sx={{
                            mt: 2,
                            border: "none"
                        }}
                        variant="outlined"
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreOutlined />}
                        >
                            What&apos;s Included
                        </AccordionSummary>
                        <AccordionDetails>
                            <List>
                                {
                                    tiers[1].description.map(incldd => (
                                        <ListItem key={incldd}>
                                            <ListItemIcon sx={{
                                                minWidth: "unset",
                                                mr: 1
                                            }}>
                                                <DoneAllOutlined sx={{ color: "success.main" }} />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={incldd}
                                            />
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </AccordionDetails>
                    </Accordion>
                </CardContent>
            </Card>
            <Alert severity={"warning"}>
                contact <strong>payment-issue@tech-scan.com!</strong>
            </Alert>
            <Card variant={"outlined"}>
                <CardContent>
                    <Typography fontSize={"1.1em"} fontWeight={600}>Pay With</Typography>
                    <Button
                        fullWidth
                        variant={"contained"}
                        disableElevation
                        sx={{
                            mt: 2
                        }}
                        onClick={handleClick}
                    >Paypal</Button>
                    <Divider sx={{
                        my: 3
                    }}>
                        <Typography color="text.secondary">Or</Typography>
                    </Divider>
                    <Typography fontSize={"1.1em"} fontWeight={600}>
                        Pay with credit or debit card
                    </Typography>
                    <Box
                        component={"img"}
                        src={"/cards.png"}
                        alt={"membership payment"}
                        sx={{
                            height: "30px",
                            width: "auto",
                            mt: "5px",
                            mb: "10px",
                        }}
                    />
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                id="cardName"
                                label="Name on card"
                                fullWidth
                                autoComplete="cc-name"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                id="cardNumber"
                                label="Card number"
                                fullWidth
                                autoComplete="cc-number"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                id="expDate"
                                label="Expiry date"
                                fullWidth
                                autoComplete="cc-exp"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                id="cvv"
                                label="CVV"
                                helperText="Last three digits on signature strip"
                                fullWidth
                                autoComplete="cc-csc"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12} sx={{
                            pt: 3,
                            pb: 2
                        }}>
                            <Button
                                color={"info"}
                                variant={"contained"}
                                sx={{
                                    mx: "auto"
                                }}
                                onClick={handleClick}
                            >
                                Pay with credit or debit card
                            </Button>
                        </Grid>
                    </Grid>
                    <Typography
                        variant={"caption"}
                        color={"text.secondary"}
                    >
                        By subscribing to Tech-Scan membership, you agree to our Membership <Link href="/company/terms-and-conditions">Terms of Service</Link>. Your payment method will be charged a recurring $250 USD monthly fee, unless you decide to cancel. No refunds for memberships canceled between billing cycles.                    </Typography>
                </CardContent>
            </Card>
        </Stack>
    );
}

export default PaymetProcess;