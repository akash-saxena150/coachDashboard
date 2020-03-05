import clickdrag from 'react-clickdrag';
import React from 'react';
import { relative } from 'path';
import { tsConstructorType } from '@babel/types';
 
 
class ExampleComponent extends React.Component {
 
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            lastPositionX: 0,
            lastPositionY: 0,
            currentX: 0,
            currentY: 0,
            valueBase: 40,//change this to value from props. This is the current value of the slider
            valueMin: 30,//change this to value from props. This is the pinned value on the slider.
            min: 10,//needs to be passed as props. This is the minimum value that will be displayed on the slider
            max: 80,//needs to be passed as props. This is the maximum value that will be displayed on the slider
            val: (40/100*(80-10))+10//needs to be calculated based on valuebase forwarded as props
        };
    }

    componentDidMount(){
        console.log('width',this.myRef.current.clientWidth);
        let wd = this.myRef.current.clientWidth;
        this.setState({
            currentX: this.state.valueBase/100*wd
        })
        
    }
    componentWillReceiveProps(nextProps) {
        let wd = this.myRef.current.clientWidth;
        let {min, max, val} = this.state;
        let sliderVal = this.state.lastPositionX + nextProps.dataDrag.moveDeltaX;
        let minSlider = 0, maxSlider = wd-minSlider;
        if(sliderVal<minSlider)
            sliderVal = minSlider
        if(sliderVal>maxSlider)
            sliderVal = maxSlider
        if(nextProps.dataDrag.isMoving) {
            this.setState({
                currentX: sliderVal,
                currentY: this.state.lastPositionY,
                valueBase: sliderVal*100/wd,
                val: (sliderVal*100/wd)/100*(max-min) + min
            });
        }
        else {
            this.setState({
                lastPositionX: this.state.currentX,
                lastPositionY: this.state.currentY,
                valueBase: this.state.currentX*100/wd,
                val: (this.state.currentX*100/wd)/100*(max-min) + min
            });
        }
    }
 
    render() {
        var translation = 'translate('+this.state.currentX+'px, '+this.state.currentY+'px)';
        let {valueBase, valueMin, val} = this.state;

        return(
            <div>
                <div style={{width: '100%'}}>
                    <div ref={this.myRef} style={{position: 'relative', width: '96%', marginLeft: '2%', height: '70px'}}>
                        <div style={{position: 'absolute', background: '#DBF3FA', left: 0, top: '30px', width: `100%`, height: '10px'}}></div>
                        <div style={{position: 'absolute', background: '#007EB4', left: 0, top: '30px', width: `${valueBase}%`, maxWidth: `${valueMin}%`, height: '10px', zIndex: 100}}></div>
                        <div style={{position: 'absolute', background: `${(valueMin-valueBase)>0?'red':'#98FF98'}`, left: `${(valueMin-valueBase)>0?valueBase:valueMin}%`, top: '30px', width: `${(valueMin-valueBase)>0?(valueMin-valueBase):(valueBase-valueMin)}%`, height: '10px'}}></div>
                        <div style={{position: 'absolute', left: 0, top: '25px', width: '100%', height: '20px', zIndex: 102}}>
                            <div style={{width: '20px', height: '20px', borderRadius: '50%', background: '#2A3439', transform: translation, zIndex: 1000}}></div>
                        </div>
                    </div>
                </div>
                <div>
                    Val: {val}
                </div>
            </div>
        )
    }
}
 
var Slider = clickdrag(ExampleComponent, {touch: true});
 
export default Slider;