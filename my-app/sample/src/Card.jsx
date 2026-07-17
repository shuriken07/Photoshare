import pic from './assets/Screenshot 2026-06-09 014503.png'

function Card(){
    return(
        <div className="card">
            <img className="card-image" src={pic} height="200px"></img>   
            <h2>this is a sample</h2>
            <p>this is the paragraph</p>
        </div>
    );
}

export default Card
