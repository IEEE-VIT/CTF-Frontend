import React, { useEffect } from 'react';

import Globe from 'react-globe.gl';
import markers from '../globe/markers.ts';
import starryBG from '../../assets/starryBG.jpg';

  export const Globe2 = ({questions}) => {

    let a=[], questionLocations=[], questionArcs=[];

    useEffect(() => {
      // console.log(questions);
      let i = 0;
      let j = 0;
      for(i = 0 ; i < (questions.length) ; i++) {
        
        questionLocations.push({
          id: questions[i]['data']['name'],
          city: 'Los Angeles',
          color: 'gold',
          coordinates: [questions[i]['data']['latitude'], questions[i]['data']['longitude']],
        });

        for(j = 0; j < questions.length ; j++) {
          if(i!==j) {
            // console.log();
            // a.push({
            //   arcLabel: `${markers[i]['city']} to ${markers[j]['city']}`,
            //   arcStartLat: markers[i]['coordinates'][0],
            //   arcStartLng: markers[i]['coordinates'][1],
            //   arcEndLat: markers[j]['coordinates'][0],
            //   arcEndLng: markers[j]['coordinates'][0],
            //   arcColor: 'red',
            // });
            questionArcs.push({
              arcLabel: `${questions[i]['data']['name']} to ${questions[j]['data']['name']}`,
              arcStartLat: questions[i]['data']['latitude'],
              arcStartLng: questions[i]['data']['longitude'],
              arcEndLat: questions[j]['data']['latitude'],
              arcEndLng: questions[j]['data']['latitude'],
              arcColor: 'red',
            });
          }
        }
      }
      console.log(questionLocations);
      console.log(questionArcs);
    });
  
    let routes = [
      {
        arcLabel: 'something',
        arcStartLat: '40.73061',
        arcStartLng: '-73.935242',
        arcEndLat: '37.773972',
        arcEndLng: '-122.431297',
        arcColor: 'red',
      },
    ];
  
		return(
			<div>
				<Globe
        globeImageUrl={'https://raw.githubusercontent.com/mayankshah1607/Cle-Air/master/earth-planet-night.jpg'}
        backgroundImageUrl={starryBG}
        showAtmosphere={true}
        animateIn={true}
        arcsData={questionArcs}
        arcLabel={loc => `${loc.arcLabel}`}
        arcStartLat={loc => +loc.arcStartLat}
        arcStartLng={loc => +loc.arcStartLng}
        arcEndLat={loc => +loc.arcEndLat}
        arcEndLng={loc => +loc.arcEndLng}
        arcDashLength={0.4}
        arcDashGap={0.05}
        arcDashAnimateTime={1500}
        arcsTransitionDuration={0}
        // arcColor={d => {
        //   const op = !hoverArc ? OPACITY : d === hoverArc ? 0.9 : OPACITY / 4;
        //   return [`rgba(0, 255, 0, ${op})`, `rgba(255, 0, 0, ${op})`];
        // }}
        // onArcHover={setHoverArc}

        pointsData={questionLocations}
        pointLabel={point => point.city}
        pointLat={point => +point.coordinates[0]}
        pointLng={point => +point.coordinates[1]}
        // pointColor={point => +point.color}
        pointAltitude={0}
        pointRadius={2}
        pointsMerge={true}
        />
			</div>
    );
  }

// export default Globe2;