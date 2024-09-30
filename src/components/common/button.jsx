import { useNavigate } from "react-router-dom"
import '../../styles/button/button.css'

export function Button({buttonText, route, style}) {
    
    const navigate = useNavigate();
    const handleclick = () => {
        navigate(route);
        
    }

    return( 
        <div className="button-container">
            <button className={style} onClick={handleclick}>{ buttonText }</button>
        </div>
    )

    
}