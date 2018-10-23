import React from 'react';
import { DefaultPlayer } from 'react-html5video';
import 'react-html5video/dist/styles.css';

const Video = ({ ...props }) => (
    <DefaultPlayer style={{ marginBottom: "15px" }} loop muted
        controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
        poster={props.poster}
        onCanPlayThrough={() => {
            // Do stuff
        }}>
        <source src={props.src} type="video/webm" />
    </DefaultPlayer>
);

export default Video;
