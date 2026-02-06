import React, { useState } from "react"
import { Checkbox, FormGroup, FormControlLabel, Box } from "@mui/material"
import classes from '../../styles/mui-styles'
import { CheckboxListProps } from './interfaces/checkbox-list-props'
import { CheckedItemsState } from './interfaces/checked-items-state'
import EditItemButton from "../EditItem/edit-item-button"
import DeleteItemButton from "../DeleteItem/delete-item-button"
import { useCategories } from "../../contexts/CategoriesContext"

const CheckboxList: React.FC<CheckboxListProps> = ({ category }) => {
    const { updateItemCompletion } = useCategories();
    const [checkedItems, setCheckedItems] = useState<CheckedItemsState>({});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedItems({
            ...checkedItems,
            [event.target.name]: event.target.checked,
        });
        updateItemCompletion(category.id, 
            category.items.find(item => item.text === event.target.name)!.id, 
            event.target.checked);
    };

    return (
        <>
            <FormGroup>
                    {category.items.map((item, id) => (
                        <Box key={item.id} sx={classes.listContainer}>
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
                            <Box key={id} sx={classes.itemButtonBox}>   
                                <EditItemButton categoryId={category.id} item={category.items[id]} />
                                <DeleteItemButton categoryId={category.id} item={category.items[id]} />
                            </Box>
                        </Box>
                    ))}
            </FormGroup>
        </>
    );
}

export default CheckboxList;