import React, {FC, useState} from 'react';
import {PackHeader, PackHeaderItem, StyledTable} from "./PacksTable.style";
import {PackItem} from "./packItem/PackItem";
import {CardsPackType} from "../../../api/PacksAPI";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';


type PacksTablePropsType = {
    cardPacks: CardsPackType[]
    sortPacks: (value:string) => void
}
export const PacksTable: FC<PacksTablePropsType> = ({cardPacks, sortPacks}) => {
    const [ascName, setAscName] = useState<boolean>(true)
    const [ascCards, setAscCards] = useState<boolean>(true)
    const [ascUpdated, setAscUpdated] = useState<boolean>(true)
    const [ascCreated, setAscCreated] = useState<boolean>(true)

    const onClickSortHandler = (criteria:boolean, value: string) => {
        sortPacks(`${criteria ? '0' : '1'}${value}`)
        switch (value){
            case 'name':
                setAscName(!criteria)
                return
            case 'cardsCount':
                setAscCards(!criteria);
                return
            case 'updated':
                setAscUpdated(!criteria);
                return
            case 'created':
                setAscCreated(!criteria);
        }
    }
        // 0 - по возрастанию
    return (
        <StyledTable>
            <PackHeader>
                <PackHeaderItem onClick={()=>onClickSortHandler(ascName, 'name')}>Name
                    {ascName ? <ArrowDropDownIcon/> : <ArrowDropUpIcon/> }</PackHeaderItem>
                <PackHeaderItem onClick={()=>onClickSortHandler(ascCards, 'cardsCount')} width={'10%'}>Cards
                    {ascCards ? <ArrowDropDownIcon/> : <ArrowDropUpIcon/>}</PackHeaderItem>
                <PackHeaderItem onClick={()=>onClickSortHandler(ascUpdated, 'updated')} >Last Updated
                    {ascUpdated ? <ArrowDropDownIcon/> : <ArrowDropUpIcon/>}</PackHeaderItem>
                <PackHeaderItem onClick={()=>onClickSortHandler(ascCreated, 'created')} >Created by
                    {ascCreated ? <ArrowDropDownIcon/> : <ArrowDropUpIcon/>}</PackHeaderItem>
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

