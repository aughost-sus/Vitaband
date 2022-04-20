import React from 'react'
import HashLoader from "react-spinners/HashLoader";


function Loader() {
  return (
    <div>
        <HashLoader size={30} color={'#6DC2AF'}></HashLoader>
    </div>
  )
}

export default Loader