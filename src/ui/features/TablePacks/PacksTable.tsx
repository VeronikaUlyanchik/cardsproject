import React, {FC, useEffect} from 'react';
import {getPackList} from "../../../bll-redux/reducers/CardsPackReducer";
import {useAppDispatch, useAppSelector} from "../../../hooks/ReduxHooks";
import {PackHeader, PackHeaderItem, StyledTable} from "./PacksTable.style";
import {PackItem} from "./packItem/PackItem";
import {CardsPackType} from "../../../api/PacksAPI";


type PacksTablePropsType = {
    cardPacks: CardsPackType[]
}
export const PacksTable: FC<PacksTablePropsType> = ({cardPacks}) => {

    useEffect(() => {
        dispatch(getPackList())
    }, [dispatch])

    return (
        <StyledTable>
            <PackHeader>
                <PackHeaderItem>Name</PackHeaderItem>
                <PackHeaderItem width={'10%'}>Cards</PackHeaderItem>
                <PackHeaderItem>Last Updated</PackHeaderItem>
                <PackHeaderItem>Created by</PackHeaderItem>
                <PackHeaderItem width={'30%'}>Actions</PackHeaderItem>
            </PackHeader>

            {
                cardPacks.map((item, i) => {
                        return <PackItem key={item._id} packId={item._id} index={i}/>
                    }
                )}

        </StyledTable>
    );
};

