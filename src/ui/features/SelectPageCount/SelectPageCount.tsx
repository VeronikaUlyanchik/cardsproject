import {MenuItem, Select, SelectChangeEvent} from '@mui/material';
import React from 'react';

type SelectPageCountType = {
    onChangeHandler: (pageCount:number)=> void
    packPerPage?:number
}

export const SelectPageCount = ({onChangeHandler, packPerPage}: SelectPageCountType ) => {

    const handleChange = (event: SelectChangeEvent) => {
        onChangeHandler(Number(event.target.value as string));
    };

    return (
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={handleChange}
            defaultValue={packPerPage ? packPerPage.toString() : '10'}
        >
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={10}>10</MenuItem>
        </Select>
    );
};

