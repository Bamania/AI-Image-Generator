import React, { useState, useEffect } from 'react'
import Loader from '../components/Loader'
import Card from '../components/Card'

export default function Home() {
    const [loading, setLoading] = useState(false)
    const [searchedtext, setSearchedtext] = useState("")
    const [allPosts, setAllPosts] = useState([]);  //all post constant mai wo chize jayengi jo hum database mai se mangayenge usuing post.find{}

    const RenderCards = (data, title) => {
        if (data.length > 0) {
            return data.map((item) => { return <Card key={item.id} {...item} /> })

        } else {
            return (
                <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
            );
        };
    }
//create a function that calls the GET api to fetch the data from the database and set the data comming to the allposts const
const fetchPosts = async () => {
    setLoading(true);
  
    try {
      const response = await fetch('http://localhost:8080/api/v1/posts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          tls_version: 'TLSv1.2'
        },
      });
  
      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      } else {
        console.error(`Response not OK. Status: ${response.status}`);
        console.error(await response.text()); // Log the response body for further details
      }
    } catch (err) {
      console.error('Fetch Error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchPosts();
  }, []);
  
    
    


return (
    <div>
        <div>
            <h1 className="font-extrabold text-[#222328] text-[32px]">The Community Showcase</h1>
            <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">Browse through a collection of imaginative and visually stunning images generated by DALL-E AI</p>
        </div>
        <div>

            {loading ? (<div className="flex justify-center items-center">
                <Loader />
            </div>) :
                (<>

                    {searchedtext && (<h2
                        className='font-medium text-[#666e75] text-xl mb-3'>
                        showing results for <span className="text-[#222328]">{searchedtext}</span>
                    </h2>)}

                    <div className='"grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
                        {searchedtext ? RenderCards([], 'No Search Results Found') : RenderCards(allPosts, "No Posts found")}

                    </div>
                </>)}

        </div>

    </div>
)
}
