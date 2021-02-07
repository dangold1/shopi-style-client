import React, { useState, useEffect } from 'react'
import './FiltersComponent.css';
import { makeStyles } from '@material-ui/core/styles';
import Select from 'react-select';
import { mapOptions } from '../../services/dataTypes.service';
import { cloneDeep } from 'lodash'
import useMounted from '../../hooks/useMounted';


const useStyles = makeStyles((theme) => ({
    selector: {
        margin: theme.spacing(1),
        minWidth: 200,
        maxWidth: 200,
        [theme.breakpoints.down('sm')]: {
            minWidth: '90%',
            maxWidth: '90%',
            marginLeft: 15,
            marginRight: 15
        },
    },
}));

const initialFilters = {
    gender: '',
    types: [],
    colors: [],
    priceRange: [],
}

const FiltersComponent = ({ collection, refetch }) => {
    const classes = useStyles();
    const mounted = useMounted();
    const [filters, setFilters] = useState(initialFilters);

    useEffect(() => {
        if (!mounted) return;
        refetch(filters);
    }, [filters])

    const updateFilters = ({ key, value }) => setFilters(prev => {
        prev = cloneDeep(prev);
        prev[key] = value;
        return prev;
    })

    const onGenderChange = (item) => updateFilters({ key: 'gender', value: item.value || '' });

    const onTypeChange = (items, options) => {
        let list = [];
        if (options.action === "remove-value") {
            list = filters.types.filter(i => i !== options.removedValue.value);
        } else {
            list = items ? items.map(i => i.value) : [];
        }
        updateFilters({ key: 'types', value: list });
    }

    const onColorChange = (items, options) => {
        let list = [];
        if (options.action === "remove-value") {
            list = filters.colors.filter(i => i !== options.removedValue.value);
        } else {
            list = items ? items.map(i => i.value) : [];
        }
        updateFilters({ key: 'colors', value: list });
    }

    return (
        <div className='filters-container'>
            {
                collection.subCategory.genders.length > 1 &&
                <Select
                    className={classes.selector}
                    placeholder="Gender"
                    options={mapOptions(collection.subCategory.genders)}
                    onChange={onGenderChange}
                />
            }
            {
                collection.subCategory.types.length > 1 &&
                <Select
                    className={classes.selector}
                    isMulti
                    placeholder="Types"
                    options={mapOptions(collection.subCategory.types)}
                    onChange={onTypeChange}
                />
            }
            {
                <Select
                    className={classes.selector}
                    closeMenuOnSelect={false}
                    isMulti
                    placeholder="Colors"
                    options={mapOptions(collection.colorsOptions)}
                    onChange={onColorChange}
                />
            }
            {
                // <Select
                //     className={classes.selector}
                //     isMulti
                //     placeholder="Price Range"
                //     options={mapOptions(collection.priceOptions)}
                //     onChange={items => updateFilters({ key: 'priceRange', value: items.map(i => i.value) })}
                // />
            }
        </div >
    )
}

export default FiltersComponent;
