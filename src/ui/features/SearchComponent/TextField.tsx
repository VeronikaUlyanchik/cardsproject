import { TextField } from '@mui/material';
import React, {ChangeEvent, useState} from 'react';
import Button from "@mui/material/Button";
import {StyledSearchComponent} from "./SearchComponent.style";

type SearchComponentPropsType = {
    onClickHandler: (packName:string)=> void
}
export const SearchComponent = ({onClickHandler}:SearchComponentPropsType) => {
    const [value, setValue] = useState<string>('')
    const onChangeHandler = (e:ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const onSearchHandler = ()=> {
        onClickHandler(value)
    }
    return (
        <StyledSearchComponent>
            <TextField id="outlined-basic" label="Search by name" variant="outlined" value={value} onChange={onChangeHandler} />
            <Button type={'submit'}
                    variant={'contained'}
                    color={'primary'}
                    onClick={onSearchHandler}>Search</Button>
        </StyledSearchComponent>
    );
};
