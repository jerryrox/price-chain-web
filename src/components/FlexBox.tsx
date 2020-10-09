import { Box, BoxProps } from "@material-ui/core";
import React from "react";

export default function FlexBox(params: BoxProps) {
    
    return (
        <Box style={{
            display: "flex",
        }} {...params} />
    );
}