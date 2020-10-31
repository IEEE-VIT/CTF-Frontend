import React from 'react';
import {FormControl, RadioGroup, FormControlLabel, Radio} from '@material-ui/core';

import './CategoryController.css';

const CategoryController = ({selectCategory, value}) => {
    return (
        <div className="question-category-container">
            <FormControl component="fieldset">
                {/* <FormLabel className="question-category-header-label question-category-textFont" component="legend">Question Categories</FormLabel> */}
                <RadioGroup className="question-category-holder" aria-label="question" name="questions" value={value} onChange={selectCategory}>
                    <FormControlLabel style={{opacity: value === "all" ? 1 : null}} value="all" control={<Radio />} label="All" labelPlacement="start" />
                    <FormControlLabel style={{opacity: value === "crypto" ? 1 : null}} value="crypto" control={<Radio />} label="Web and Crypto" labelPlacement="start" />
                    <FormControlLabel style={{opacity: value === "jails" ? 1 : null}} value="jails" control={<Radio />} label="OSint and Jails" labelPlacement="start" />
                    <FormControlLabel style={{opacity: value === "misc" ? 1 : null}} value="misc" control={<Radio />} label="Misc and Forensics" labelPlacement="start" />
                    <FormControlLabel style={{opacity: value === "binary" ? 1 : null}} value="binary" control={<Radio />} label="Binary and Reverse" labelPlacement="start" />
                </RadioGroup>
            </FormControl>
        </div>
    );
}

export default CategoryController;
