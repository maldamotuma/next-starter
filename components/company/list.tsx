"use client";

import { Company } from "@/components/company/types";
import { useInitialList } from "@/hooks/remote-call";
import { FunctionComponent } from "react";
import CompanyForm from "./form";
import {
    Grid,
    CardActionArea
} from "@mui/material";
import CompanyCard from "./card";

interface CompanyCopiesProps {

}

const CompanyCopies: FunctionComponent<CompanyCopiesProps> = () => {
    const {
        data: copies,
        status,
        handleDelete: delCopy,
        renderDialog,
        alterData: alterCopy,
        handleEdit,
        edit,
        close,
        renderList
    } = useInitialList<Company>("/company-copies", {
        ky: "copies"
    });

    return (
        <>
            {
                renderDialog({
                    txt: {
                        btn_txt: "Add Company Copy",
                        header: edit ? "Edit Company Copy" : "Add Company Copy"
                    },
                    frm: <CompanyForm close={close} alterCopy={alterCopy} cpy={edit} deleteCopy={delCopy}/>,
                    dialogProps: {
                        fullWidth: true,
                        maxWidth: "lg"
                    }
                })
            }
            {
                renderList(<Grid container spacing={3}>
                    {
                        copies.map(copy => (
                            <Grid item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                key={copy.title}
                            >
                                <CardActionArea
                                    onClick={() => handleEdit(copy)}
                                >
                                    <CompanyCard
                                        copy={copy}
                                    />
                                </CardActionArea>
                            </Grid>
                        ))
                    }
                </Grid>)
            }
        </>
    );
}

export default CompanyCopies;