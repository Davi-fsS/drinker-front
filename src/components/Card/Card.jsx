import "./style.css";

const Card = ({ children }) => {
    return <div className="card">
        <div className="card-text">
            {children}
        </div>
    </div>
}

export default Card;
