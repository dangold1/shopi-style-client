import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { BASE_API_URL } from '../../utils/keys';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateSelectedProductAction } from '../../store/actions/products';
import './AutoCompleteComponent.css';
import { Link } from 'react-router-dom';

const AutoCompleteComponent = props => {

    const [suggestions, setSuggestions] = useState([]);
    const [itemLabel, setItemLabel] = useState("");

    const dispatch = useDispatch();

    const fetchResults = async ({ value }) => {
        if (!value || value.length < 2) {
            setSuggestions([]);
            return;
        }
        try {
            const { data } = await axios.get(`${BASE_API_URL}/products?text=${value}`);
            setSuggestions(data.map(item => { return { label: item.caption.trim(), value: item } }))
        } catch (err) {
            setSuggestions([]);
        }
    }

    const onSuggestionSelected = (event, { suggestion }) => {
        dispatch(updateSelectedProductAction(suggestion.value));
        setItemLabel(suggestion.label);
    }

    const onChange = (event, { newValue, method }) => {
        if (method === 'type' || method === 'enter') {
            setItemLabel(newValue)
        }
    }

    return (
        <div className="autosuggest-container">
            <Autosuggest
                inputProps={{
                    placeholder: "Search...",
                    value: itemLabel.trim(),
                    onChange: onChange
                }}
                suggestions={suggestions}
                onSuggestionsFetchRequested={fetchResults}
                onSuggestionsClearRequested={() => setSuggestions([])}
                getSuggestionValue={suggestion => suggestion.value.caption}
                onSuggestionSelected={onSuggestionSelected}
                renderSuggestion={({ value }) => {
                    return (
                        <Link className="link" to={`/${value.subCategory}/${value._id}`} key={value._id + 'link'}>
                            <div className="suggestion">
                                <img className="image" src={value.imageUrl} alt={value.caption} />
                                <span>{value.caption}</span>
                            </div>
                        </Link>
                    )
                }}
            />
        </div>
    )

}


export default AutoCompleteComponent;
