import { TextField } from '@mui/material';
import React, {ChangeEvent, useState} from 'react';
import Button from "@mui/material/Button";
import {StyledSearchComponent} from "./SearchComponent.style";

type SearchComponentPropsType = {
    onClickHandler: (value:string)=> void
    label: string
}

export const SearchComponent = ({onClickHandler, label}:SearchComponentPropsType) => {
    const [value, setValue] = useState<string>('')
    const onChangeHandler = (e:ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const onSearchHandler = ()=> {
        onClickHandler(value)
    }
    return (
        <StyledSearchComponent>
            <TextField id="outlined-basic" label={label} variant="outlined" value={value} onChange={onChangeHandler} />
            <Button type={'submit'}
                    variant={'contained'}
                    color={'primary'}
                    onClick={onSearchHandler}>Search</Button>
        </StyledSearchComponent>
    );
};
