import React, {FC} from 'react';
import {PackHeader, PackHeaderItem, StyledTable} from "./PacksTable.style";
import {PackItem} from "./packItem/PackItem";
import {CardsPackType} from "../../../api/PacksAPI";


type PacksTablePropsType = {
    cardPacks: CardsPackType[]
}
export const PacksTable: FC<PacksTablePropsType> = ({cardPacks}) => {

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
