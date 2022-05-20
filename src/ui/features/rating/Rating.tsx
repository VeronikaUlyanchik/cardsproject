import React, {FC} from 'react';
import FormControl from "@mui/material/FormControl";
import {Text} from "../modal/Modal.style";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

const ratesArray = [
    {value: 1, label: "Did not know"},
    {value: 2, label: "Forgot"},
    {value: 3, label: "A lot of thought"},
    {value: 4, label: "Сonfused"},
    {value: 5, label: "Knew the answer"}
]

type RatingPropsType = {
    grade: number
    setGrade: (value: number) => void
}
export const Rating: FC<RatingPropsType> = ({grade, setGrade}) => {
    return (
        <FormControl>
            <Text>
                <b>Rate yourself:</b>
            </Text>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={grade}
                name="radio-buttons-group"
            >
                {ratesArray.map(item => {
                    return <FormControlLabel
                        key={item.value}
                        value={item.value}
                        control={<Radio onClick={() => setGrade(item.value)}/>}
                        label={item.label}
                    />
                })}
            </RadioGroup>
        </FormControl>
    );
};