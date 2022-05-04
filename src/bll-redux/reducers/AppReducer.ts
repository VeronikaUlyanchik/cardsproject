const initState={
    state: 'state'
}

type IitStateType ={state: string};

type AppActionsType= {
    type: 'REDUCER'
}
export const Reducer = (state:IitStateType=initState, action:AppActionsType)=> {
    return state
}