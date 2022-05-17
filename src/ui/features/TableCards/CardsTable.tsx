import React, {FC} from 'react';
import {useAppSelector} from "../../../hooks/ReduxHooks";
import {CardHeader, CardHeaderItem, StyledTable} from "./CardsTable.style";
import {CardTableItem} from "./cardItem/CardItem";
import {selectCards} from "../../../selectors/CardsSelectors";
import {selectUserId} from "../../../selectors/UserSelectors";


type CardsTablePropsType = {
    id: string
}
export const CardsTable: FC<CardsTablePropsType> = ({id}) => {

    const userId = useAppSelector(selectUserId)
    const cards = useAppSelector(state => selectCards(state, id))
    const cardUserId = cards.length !== 0 && cards[0].user_id

    return (
        <StyledTable>
            <CardHeader>
                <CardHeaderItem width={'30%'}>Question</CardHeaderItem>
                <CardHeaderItem width={'30%'}>Answer</CardHeaderItem>
                <CardHeaderItem>Last Updated</CardHeaderItem>
                <CardHeaderItem>Grade</CardHeaderItem>
                {
                    userId === cardUserId &&
                    <CardHeaderItem>Change</CardHeaderItem>
                }
            </CardHeader>

            {cards.length !== 0
                ? cards.map((item, i) => {
                        return <CardTableItem key={item._id} cardId={item._id} index={i}/>
                    }
                )
                : <div style={{fontWeight: "bold", padding: "20px"}}>No Cards</div>
            }

        </StyledTable>
    );
};

