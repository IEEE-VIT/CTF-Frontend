import React from 'react';
// import './planetaryjs.min.js';
// var Planetaryjs=require('../../../node_modules/planetary.js');
import '../../../node_modules/planetary.js';


class Globe extends React.Component{
    
    render(){
        return(
            <div>
                <canvas id='globe' width='500' height='500' onClick={(event)=>{
                    console.log(event);
                    this.getOffset(event);
                }}></canvas>
                {/* Namastey Duniyaa! */}
            </div>
        );
    }
}

export default Globe;