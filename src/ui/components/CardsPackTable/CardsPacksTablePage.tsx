import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/ReduxHooks";
import {NavLink} from "react-router-dom";
import {PATH} from "../../../App";
import SuperButton from "../../features/SuperButton/SuperButton";
import {createCardsPack} from "../../../bll-redux/reducers/CardsPackReducer";
import SuperInputText from "../../features/SuperInputText/SuperInputText";
import {PacksTable} from "../../features/TablePacks/PacksTable";

export const CardsPacksTablePage = () => {
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector<boolean>(state => state.auth.isLoggedIn)

    if (!isAuth) {
        return <NavLink to={PATH.LOGIN}/>
    }

    // const addPack = () => {
    //     dispatch(createCardsPack(title))
    // }

    const showCards = () => {
        return <NavLink to={PATH.CARDS}/>
    }

    return (
        <div>
            <PacksTable/>
        </div>
    );
};