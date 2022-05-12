import React, {useEffect} from 'react';
import {useAppDispatch} from "../../../hooks/ReduxHooks";
import {useSearchParams} from "react-router-dom";
import {CardsTable} from "../../features/TableCards/CardsTable";
import {getCardsTC} from "../../../bll-redux/reducers/CardsReducer";


export const CardsTablePage = () => {

    const dispatch = useAppDispatch()

    const [searchParams, setSearchParams] = useSearchParams()
    const id = searchParams.get('cardsPack_id')


    useEffect(() => {
        if (id) {
            dispatch(getCardsTC(id))
        }

    }, [])


    return (
        <div>
            <CardsTable id={id ? id : ''}/>
        </div>
    );
};
