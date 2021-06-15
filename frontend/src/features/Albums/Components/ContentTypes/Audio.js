import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { STATIC_URL } from "../../../../../package.json"

const AudioC = props => (
    <div className="content content-audio">
        <AudioPlayer
            autoPlay
            src={STATIC_URL + props.src}
            onPlay={e => console.log("onPlay")}
        // other props here
        />
    </div>
)

export default AudioC