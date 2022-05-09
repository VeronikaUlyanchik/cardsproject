import React, {FC} from 'react';
import {useAppSelector} from "../../../hooks/ReduxHooks";
import {PackHeader, PackHeaderItem, StyledTable} from "./CardsTable.style";
import {CardTableItem} from "./cardItem/CardItem";
import {selectCards} from "../../../selectors/CardsSelectors";


type CardsTablePropsType = {
    id: string
}
export const CardsTable: FC<CardsTablePropsType> = ({id}) => {

    const cards = useAppSelector(state => selectCards(state, id))


    return (
        <StyledTable>
            <PackHeader>
                <PackHeaderItem width={'30%'}>Question</PackHeaderItem>
                <PackHeaderItem width={'30%'}>Answer</PackHeaderItem>
                <PackHeaderItem>Last Updated</PackHeaderItem>
                <PackHeaderItem>Grade</PackHeaderItem>
            </PackHeader>

            {
                cards.map(item => {
                        return <CardTableItem key={item._id} cardId={item._id}/>
                    }
                )}

        </StyledTable>
    );
};

