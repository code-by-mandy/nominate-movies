const Search = ({getSearchString, resetSearch}) => {

    let inputString ="";

    const handleSubmit = (e) => {
        getSearchString(inputString);
        resetSearch(e);
    }
     
    return (
        <div>
            <form onSubmit={handleSubmit} name="search">
                <div className="inputBox">
                    <label htmlFor="search" name="search">Movie Name</label>
                    <input type="search" id="search"  name="search" placeholder="E.g. The Lion King" onChange = {e => inputString = e.target.value}></input>
                </div>                
                <div className="buttonBox">
                    <button name="search">Search</button>
                </div>                
            </form>
        </div>
    )
}

export default Search