import React, { useEffect } from 'react';

import Globe from 'react-globe.gl';

  export const Globe2 = ({userProfile, questions, showQuestionModal}) => {

    let questionLocations=[], questionArcs=[];

    useEffect(() => {
      let i = 0;
      let j = 0;
      for(i = 0 ; i < (questions.length) ; i++) {

        let flag = false;
        
        for(j = 0 ; j <= userProfile['qAnswered'].length ; j++) {
          if(userProfile['qAnswered'][j] === questions[i]['id']) {
            flag = true;
          }
        }


        questionLocations.push({
          id: questions[i]['id'],
          city: 'Los Angeles',
          color: flag ? 'green' : 'red',
          coordinates: [questions[i]['data']['latitude'], questions[i]['data']['longitude']],
          index: i
        });
        
        if(flag) {
          continue;
        }

        for(j = 0; j < questions.length ; j++) {

          // display only a few arcs not all
          if (Math.round(Math.random()) === 1) {
            continue;
          }

          if(i!==j) {
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

    });

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

          pointsData={questionLocations}
          pointLabel={point => point.id}
          pointLat={point => point.coordinates[0]}
          pointLng={point => point.coordinates[1]}
          pointColor={point => point.color}
          pointAltitude={0.2}
          pointRadius={1}
          pointsMerge={false}
          onPointClick={(point)=>{
            if (userProfile['qAnswered'].includes(point.id)) {
              return null;
            }
            showQuestionModal(point);
          }}
        />
			</div>
    );
  }