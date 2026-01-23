import React, { useState } from "react"
import { Checkbox, FormGroup, FormControlLabel } from "@mui/material"
import classes from '../../_styles/mui-styles'
import { CheckboxListProps } from './interfaces/checkbox-list-props'
import { CheckedItemsState } from './interfaces/checked-items-state'

const CheckboxList: React.FC<CheckboxListProps> = ({ category }) => {
    const [checkedItems, setCheckedItems] = useState<CheckedItemsState>({});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedItems({
            ...checkedItems,
            [event.target.name]: event.target.checked,
        });
    };

    return (
        <FormGroup>
                {category.items.map((item, id) => (
                    <FormControlLabel
                        sx={checkedItems[item.text] !== undefined ? (checkedItems[item.text] ? classes.completedItemText : {}) : (item.completed ? classes.completedItemText : classes.listText )}
                        key={id}
                        control={
                            <Checkbox
                                checked={checkedItems[item.text] !== undefined ? checkedItems[item.text] : item.completed}
                                onChange={handleChange}
                                name={item.text}
                            />
                        }
                        label={item.text}
                    />
                ))}
        </FormGroup>
    );
}

export default CheckboxList;