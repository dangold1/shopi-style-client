import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import './CategoriesBarComponent.css';
import { capitalFirstLetter } from '../../services/dataTypes.service';
import categories from '../../utils/data';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        backgroundColor: '#2d2d2d',
    },
}));


const CategoriesBarComponent = props => {
    const classes = useStyles();
    const [isOpenSubcategories, setIsOpenSubcategories] = useState(false);
    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    {
                        Object.keys(categories).map((category, index) =>
                            <div className="dropdown" key={index}>
                                <li
                                    className="dropdown-li"
                                    onClick={() => setIsOpenSubcategories(true)}
                                >
                                    {capitalFirstLetter(category)}
                                </li>
                                {
                                    isOpenSubcategories && <div className="dropdown-content" key={index}>
                                        {
                                            categories[category].map((subCategory, i) =>
                                                <Link
                                                    to={`/${subCategory}`}
                                                    key={i}
                                                    onClick={() => setIsOpenSubcategories(false)}
                                                >
                                                    {capitalFirstLetter(subCategory)}
                                                </Link>
                                            )
                                        }
                                    </div>
                                }
                            </div>
                        )
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default CategoriesBarComponent;