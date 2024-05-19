import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";



   

function Test() {


    const navigate = useNavigate("");

    useEffect(() => {
      navigate("/cabinet/login");
    }, []);

  

  return (
    
    <></>

  );
}

export default Test;
