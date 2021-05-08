const Search = ({getSearchString, searched}) => {
 
    return (

        //get input from dom
        //put return in parameter input
        //pass back to parent

        
        <div>
            <form onSubmit={(e) => searched(e)}>
                <label htmlFor="search">Search</label>
                <input type="search" id="search" onChange = {(e) => getSearchString(e.target.value)}></input>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Search