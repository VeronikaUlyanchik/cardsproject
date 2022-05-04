import React from 'react';
import SuperInputText from "../../features/SuperInputText/SuperInputText";
import SuperButton from "../../features/SuperButton/SuperButton";
import SuperCheckbox from "../../features/SuperCheckbox/SuperCheckbox";

export const Test = () => {
    return (
        <div>
            <SuperInputText/>
            <SuperButton>Submit</SuperButton>
            <SuperCheckbox/>
        </div>
    )
}