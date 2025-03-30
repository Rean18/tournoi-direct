import circleIcon from '/circle-info-solid.png';
import { useState } from 'react';
import '../../styles/circleInfo/circleInfo.css';

export function CircleInfo({ message }) {
  const [displayedInfo, setDisplayedInfo] = useState('info-hidden');

  return (
    <div
      className="info-container"
      onMouseEnter={() => setDisplayedInfo('info-visible')}
      onMouseLeave={() => setDisplayedInfo('info-hidden')}
    >
      <div className="circle-info-container">
        <img src={circleIcon} alt="icone information" />
      </div>
      <div className={displayedInfo}>
        <div className="message-container">{message}</div>
      </div>
    </div>
  );
}
