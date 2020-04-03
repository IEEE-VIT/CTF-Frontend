// import '../../assets/globe_dark.jpg';
import React, {useState} from 'react';

import ReactGlobe from 'react-globe';
import { defaultBarMarkerOptions, defaultDotMarkerOptions } from "react-globe";

import markers from './markers.ts';
// import './planetaryjs.min.js';
// var Planetaryjs=require('../../../node_modules/planetary.js');
// import '../../../node_modules/planetary.js';
const globe2=require('./globe_dark.jpg');
// const [globe, setGlobe] = useState(globe1);
let globee;

class Globe extends React.Component{
    constructor(){
        super();
        this.state={
            focus: undefined
        };
    }

    something(){        
        const [globe, setGlobe] = useState(globe2);
        globee=globe;
        setGlobe(globe2);
    }
    // buttonLay=()=>{
    //     const [focus, setFocus] = useState(undefined);
    //     return(
    //         <div>
    //             <button onClick={() => setFocus([1.3521, 103.8198])}>Singapore</button>
    //         </div>
    //     );
    // }
    render(){
        return(            
            <div className="globe-container">
                {/* <canvas id='globe' width='500' height='500' onClick={(event)=>{
                    console.log(event);
                    this.getOffset(event);
                }}></canvas> */}
                {/* Namastey Duniyaa! */}
                <button onClick={()=>{
                    // this.something();
                    var arr=[
                        [1.3521, 103.8198],
                        [40.73061, -73.935242],
                        [37.773972, -122.431297],
                        [39.9042, 116.4074],
                        [51.5074, 0.1278],
                        [29.7604, -95.3698]
                    ];
                    var a=arr[parseInt((Math.random()*arr.length)%arr.length)]
                    this.setState({
                        focus: a
                    });
                    console.log(a);
                }}>Change Focus Location</button>
                <ReactGlobe 
                size={[900, 600]}
                globeOptions={{
                    cloudsOpacity: 0.6,
                    enableClouds: false,
                    // texture: `https://raw.githubusercontent.com/chrisrzhou/react-globe/master/textures/globe_dark.jpg`,
                    texture: `https://raw.githubusercontent.com/mayankshah1607/Cle-Air/master/earth-planet-night.jpg`,
                }}
                cameraOptions={{
                    enableZoom: true,
                    distanceRadiusScale: 5,
                    maxDistanceRadiusScale: 15,
                    zoomSpeed: 2,
                    autoRotateSpeed: 1,
                    enableAutoRotate: true,
                    enableRotate: true,
                    rotateSpeed: 0.5
                }}
                lightOptions={{
                    pointLightColor: 'white',
                    pointLightIntensity: 2,
                    pointLightPositionRadiusScales: [2, 1, -1],
                  }}
                focus={this.state.focus}
                focusOptions={{
                    animationDuration: 3000,
                    distanceRadiusScale: 3,
                    // easingFunction: ['Elastic', 'In'],
                    // easingFunction: ['Linear', 'None'],
                    enableDefocus: false,
                  }}
                 markers={markers}
                //  markerOptions={defaultDotMarkerOptions}
                markerOptions={{
                    activeScale: 1.1,
                    enableTooltip: true,
                    enableGlow: true,
                    // glowCoefficient: 10,
                    enterAnimationDuration: 3000,
                    enterEasingFunction: ['Bounce', 'InOut'],
                    exitAnimationDuration: 3000,
                    exitEasingFunction: ['Cubic', 'Out'],
                    getTooltipContent: marker => `${marker.city} (Sales: ${marker.value}.0M)`,
                    radiusScaleRange: [0.01, 0.05],
                  }}
                
                />
            </div>
        );
    }
}

export default Globe;