import React, { useEffect } from 'react';

import Globe from 'react-globe.gl';
import markers from '../globe/markers.ts';
import starryBG from '../../assets/starryBG.jpg';

  export const Globe2 = ({questions, showQuestionModal}) => {

    let a=[], questionLocations=[], questionArcs=[];

    useEffect(() => {
      // console.log(questions);
      let i = 0;
      let j = 0;
      for(i = 0 ; i < (questions.length) ; i++) {
        
        questionLocations.push({
          id: questions[i]['data']['name'],
          city: 'Los Angeles',
          color: ['green', 'yellow', 'red', 'black'][Math.round(Math.random()*3)],
          coordinates: [questions[i]['data']['latitude'], questions[i]['data']['longitude']],
          index: i
        });

        for(j = 0; j < questions.length ; j++) {

          if (Math.round(Math.random()) === 1) {
            continue;
          }

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
              arcColor: questionLocations[questionLocations.length-1].color,
              arcDashAnimateTime:  (Math.random() + 1)*2000,
              arcAltitude: Math.random()/2,
            });
          }
        }
      }
      // console.log(questionLocations);
      // console.log(questionArcs);
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
          // backgroundImageUrl={starryBG}
          showAtmosphere={true}
          animateIn={true}
          arcsData={questionArcs}
          arcLabel={loc => `${loc.arcLabel}`}
          arcStartLat={loc => loc.arcStartLat}
          arcStartLng={loc => loc.arcStartLng}
          arcEndLat={loc => loc.arcEndLat}
          arcEndLng={loc => loc.arcEndLng}
          arcColor={loc => loc.arcColor}
          arcDashLength={1}
          arcDashGap={1}
          arcDashAnimateTime={loc => loc.arcDashAnimateTime}
          arcsTransitionDuration={0}
          arcAltitude={loc => loc.arcAltitude}
          // onArcHover={setHoverArc}

          pointsData={questionLocations}
          pointLabel={point => point.id}
          pointLat={point => point.coordinates[0]}
          pointLng={point => point.coordinates[1]}
          pointColor={point => point.color}
          pointAltitude={0.2}
          pointRadius={1}
          pointsMerge={false}
          onPointClick={(point)=>{showQuestionModal(point);}}
        />
			</div>
    );
  }

// export default Globe2;