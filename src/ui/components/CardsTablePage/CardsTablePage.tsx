import React, {useEffect} from 'react';
import {useAppDispatch} from "../../../hooks/ReduxHooks";
import {NavLink, useNavigate, useSearchParams} from "react-router-dom";
import {CardsTable} from "../../features/TableCards/CardsTable";
import {getCardsTC} from "../../../bll-redux/reducers/CardsReducer";
import { ContentWrapper } from '../../../common/global-styles/CommonStyles.style';
import {StyledSearchForm} from "./CardsTablePage.style";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import {PATH} from "../../../App";


export const CardsTablePage = () => {

    const navigate= useNavigate()

    const dispatch = useAppDispatch()

    const [searchParams, setSearchParams] = useSearchParams()
    const id = searchParams.get('cardsPack_id')


    useEffect(() => {
        if (id) {
            dispatch(getCardsTC(id))
        }

    }, [])

    const goBackToPacks = () => {
        return navigate(`${PATH.PACKS}`)
    }

    return (
        <div>
            <ContentWrapper width={"1000px"} height={"750px"}>
                <StyledSearchForm>
                    <h1>
                        <ArrowCircleLeftIcon fontSize={"medium"} onClick={goBackToPacks}/>
                        Pack Name</h1>
                    <input type="text"/>
                    <input type="text"/>
                </StyledSearchForm>
                <div style={{height: "75%"}}>
                    <CardsTable id={id ? id : ''}/>
                </div>

            </ContentWrapper>
        </div>
    );
};
