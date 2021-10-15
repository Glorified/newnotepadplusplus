import React, {useEffect, useRef, useState} from 'react';


const Mycentime = () =>{

    return(
        <div>

       <iframe src="https://go.qa.centime.com/login" height={"900 px"} width={"1700 px"} referrerPolicy={"origin"}></iframe>
        {/*   <iframe src="http://localhost:9081/login" height={"900 px"} width={"1700 px"} referrerPolicy={"origin"}></iframe>*/}

           {/* <iframe src={"https://www.go.dev.centime.com/login"} height={this.props.height} width={this.props.width}/>*/}
        </div>

    )

}

export default Mycentime;