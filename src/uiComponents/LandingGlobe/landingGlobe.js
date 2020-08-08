import React from 'react';

import Globe from 'react-globe.gl';

import './landingGlobe.css';

export const LandingGlobe = () => {
	return(
		<div className = 'landing-globe'>
			<Globe
				globeImageUrl={'https://raw.githubusercontent.com/mayankshah1607/Cle-Air/master/earth-planet-night.jpg'}
				// backgroundImageUrl={starryBG}
				showAtmosphere={true}
				animateIn={true}
			/>
		</div>
	);
}
