import { HashRouter } from "react-router-dom"
import App from '../App'

const WrappedApp = () => {
    return (
        <HashRouter>
            <App />
        </HashRouter>
    )
}

export default WrappedApp