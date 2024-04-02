import '@/styles/starRate.css'
function StarRate({voteRate}:{voteRate:(arg:number)=>void}) {
   
    const vote = (e:any)=>{
       let checkRate = e.target?.id;
       let lastChar = checkRate.charAt(checkRate.length - 1);
       let countRate = parseInt(lastChar) +1
       voteRate(countRate)
    }
  
  return (
    <div className="rating-stars">
        {
            [...Array(5)].map((star,index)=>{
                return(<>
                <input key={index} type="radio" onChange={vote} name="rating" id={`rs${index}`}/><label htmlFor={`rs${index}`}></label>
                </>
                )
            })
        }
	</div>
  )
}

export default StarRate