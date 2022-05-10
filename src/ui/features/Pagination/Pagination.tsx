import React, { ChangeEvent } from 'react';
import {Pagination} from "@mui/material";



export const PaginationPage = () => {
    // const dispatch = useAppDispatch()
    const pageHandler = (event: ChangeEvent<unknown>, page: number) => {
        // dispatch(setCardsThunk(page))
    }
    return (
        <div>
            <Pagination count={112} shape="rounded" onChange={pageHandler}/>
        </div>
    );
};

