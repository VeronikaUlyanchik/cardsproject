import React, { ChangeEvent } from 'react';
import {Pagination} from "@mui/material";

type PaginationPropsType = {
    onClickHandler: (page:number) => void
    totalPage:number
    currentPage?: number
}

export const PaginationComponent = ({onClickHandler, totalPage , currentPage}: PaginationPropsType) => {

    const pageHandler = (event: ChangeEvent<unknown>, page: number) => {
        onClickHandler(page)
    }
    return (
        <div>
            <Pagination count={totalPage} shape="rounded" onChange={pageHandler} page={currentPage}/>
        </div>
    );
};

