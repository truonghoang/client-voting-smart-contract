import React from 'react'
import "@/styles/Star.scss"
function StarRate({onChangeStar}) {
    const [selectedStar, setSelectedStar] = React.useState(0);

    const handleStarClick = (starIndex) => {
      console.log("🚀 ~ handleStarClick ~ starIndex:", starIndex)
      setSelectedStar(starIndex);
      onChangeStar(starIndex)
    };
  return (
    <ul className="ratings">
  {
    [1,2,3,4,5].map((item)=>{
        return (<li key={item}  className={selectedStar >= item ? 'star selected' : 'star'} onClick={() => handleStarClick(item)}>
 
        </li>)
    })
  }
  </ul>
  )
}

export default StarRate