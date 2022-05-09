import React, { ChangeEvent } from 'react';
import {Pagination} from "@mui/material";
import {useAppDispatch} from "../../../hooks/ReduxHooks";
import {setCardsThunk} from "../../../bll-redux/reducers/CardsReducer";

export const PaginationPage = () => {
    const dispatch = useAppDispatch()
    const pageHandler = (event: ChangeEvent<unknown>, page: number) => {
        dispatch(setCardsThunk(page))
    }
    return (
        <div>
            <Pagination count={112} shape="rounded" onChange={pageHandler}/>
        </div>
    );
};

