import { Box, Divider, Typography } from "@material-ui/core";
import React from "react";

interface ITitleHeaderParam {
    title?: string
}

export default function TitleHeader({
    title,
}: ITitleHeaderParam) {
    
    return (
        <Box style={{
            width: "100%",
        }}>
            <Box height={30} />
            <Typography variant="h4">{title ?? ""}</Typography>
            <Box height={5} />
            <Divider />
            <Box height={10} />
        </Box>
    );
}