import { Box } from "@material-ui/core";
import React from "react";

interface IJsonTextDisplayParam {
    value: any,
    spacing?: number,
}

export default function JsonTextDisplay({
    value,
    spacing,
}: IJsonTextDisplayParam) {
    
    return (
        <Box>
            <pre>
                {JSON.stringify(value, null, spacing ?? 2)}
            </pre>
        </Box>
    );
}