import React from 'react';
import './Tutorials.scss';

function Tutorials (props){ 

    return (
        <div className='tutorials'>
            <div className='home-image'>
                <iframe src="https://player.vimeo.com/video/456242340" frameBorder="0" allow="autoplay; fullscreen" allowFullScreen></iframe>
            </div>
            <div className='home-image'>
                <iframe src="https://player.vimeo.com/video/456242396" frameBorder="0" allow="autoplay; fullscreen" allowFullScreen></iframe>
            </div>
            <div className='home-image'>
                <iframe src="https://player.vimeo.com/video/456242710" frameBorder="0" allow="autoplay; fullscreen" allowFullScreen></iframe>
            </div>
            <div className='home-image'>
                <iframe src="https://player.vimeo.com/video/456242807" frameBorder="0" allow="autoplay; fullscreen" allowFullScreen></iframe>
            </div>
        </div>
    );
}
  
export default Tutorials;