const PopUp = ( {close, noPopUp}) => {

    return (
        <div className="modalBody">
            <h1>You're all set!</h1>
            <p>Happy watching!</p>
            <p>To nominate a different movie, remove a movie from your nominations list.</p>
            <button className="close" onClick={() => close()}>Close</button>
            <form name="popUpPreference" className="popUpPreference">
                <label htmlFor="noPopUp" className="noPopUpLabel">Don't show this message again</label>
                <input 
                    id="noPopUp" 
                    type="checkbox" 
                    className="noPopUp"
                    onClick={() => noPopUp()}
                ></input>
            </form>
        </div>       
    )
}

export default PopUp