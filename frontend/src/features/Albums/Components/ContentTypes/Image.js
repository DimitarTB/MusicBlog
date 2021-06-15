import { STATIC_URL } from "../../../../../package.json"

const Image = props => (
    <div className="content content-image">
        <img src={STATIC_URL + props.src} />
    </div>
)

export default Image