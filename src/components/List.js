const List = ({movie, nominate, button, disabled}) => {

    return(
        <>
        <li>
            <div>
                {movie.Title} ({movie.Year})
                <button onClick={() => nominate(movie)} disabled={disabled}>{button}</button>
            </div>
        </li>
        </>
    );
}

export default List