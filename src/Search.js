const Search = ({getSearchString, resetSearch}) => {

    let inputString ="";

    const handleSubmit = (e) => {
        getSearchString(inputString);
        resetSearch(e);
    }
     
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="search">Movie title</label>
                <input type="search" id="search" onChange = {e => inputString = e.target.value}></input>
                <button>Search</button>
            </form>
        </div>
    )
}

export default Search