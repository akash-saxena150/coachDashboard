import React, {Component} from 'react';

import {getListObjects, getSignedUrl} from './FetchImgs';

class ImageS3 extends Component{
    constructor(props){
        super(props);
        this.state={};
    }
    imgError() {
        console.log("Error");
        this.setState({imgURL: "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"})
    }
    componentDidMount(){
        getSignedUrl( this.props.imgSrc,
                'image/jpeg',
                this.props.folder,
                'getObject'
            
        ).then((data)=>{
            this.setState({imgURL: data.replace('s3','s3-accelerate')});
        })
        .catch(err=>{
            this.setState({error: true});
        })        
    }
    render(){
        const that = this;
        return(
        <div>
            <img src={this.state.imgURL} style={this.props.style || {width: '100%'}} onError={()=>{this.imgError()}}/>
        </div>
        )
    }
}
export default ImageS3
