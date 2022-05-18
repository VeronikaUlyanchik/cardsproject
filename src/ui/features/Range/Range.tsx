import Slider from '@mui/material/Slider/Slider';
import {styled} from '@mui/material/styles';
import React from 'react';
import {useAppSelector} from "../../../hooks/ReduxHooks";

function valuetext(value: number) {
    return `${value}`;
}

const minDistance = 1;

const CustomizedSlider = styled(Slider)`
  color: #20b2aa;
  width: 100%;

  :hover {
    color: #2e8b57;
  }

  & .MuiSlider-thumb {
    border-radius: 1px;
  }
`;

type RangePropsType = {
    searchWithMinMax: ([min, max]: number[]) => void
}
export const Range = ({searchWithMinMax}: RangePropsType) => {
    const max = useAppSelector(state => state.packList.maxCardsCount)
    const min = useAppSelector(state => state.packList.minCardsCount)

    const [value, setValue] = React.useState<number[]>([min, max]);

    const onMouseLeaveHandler = ()=> {
        searchWithMinMax([value[0], value[1]]);
    }

    const handleChange = (
        event: Event,
        newValue: number | number[],
        activeThumb: number,
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
        } else {
            setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
        }
    };
    return (
        <div>
            <h3>Number of cards</h3>
            <CustomizedSlider
                getAriaLabel={() => 'Minimum distance shift'}
                value={value}
                onChange={handleChange}
                onMouseUp = {onMouseLeaveHandler}
                valueLabelDisplay="on"
                getAriaValueText={valuetext}
                disableSwap
                min={min}
                max={max}
            />
        </div>
    );
};
