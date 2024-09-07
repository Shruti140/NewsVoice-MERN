import React, { useState } from 'react';

const Search = ({ onSearch }) => {
    const [keyword, setKeyword] = useState('');

    const handleKeywordChange = (e) => {
        setKeyword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(keyword);
        setKeyword('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className='nav-search'>
                <input
                    type="text"
                    value={keyword}
                    autoFocus
                    onChange={handleKeywordChange}
                    placeholder="Search keyword"
                />
                <button className='button1' type="submit">Search</button>
            </form>
        </div>
    );
};

export default Search;