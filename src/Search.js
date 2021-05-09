const Search = ({getSearchString, resetSearch}) => {
 
    return (
        
        <div>
            <form onSubmit={(e) => resetSearch(e)}>
                <label htmlFor="search">Movie title</label>
                <input type="search" id="search" onChange = {(e) => getSearchString(e.target.value)}></input>
                <button>Search</button>
            </form>
        </div>
    )
}

export default Search