import {
    FaQuoteLeft,
    FaQuoteRight
} from 'react-icons/fa'

const Lyrics = props => (
    <div className="content content-lyrics">
        <pre>
            <FaQuoteLeft />
            {props.data}
            <FaQuoteRight />
        </pre>
    </div>
)

export default Lyrics