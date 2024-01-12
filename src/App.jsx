import React from 'react'
import { BrowserRouter,Link,Route,Routes} from 'react-router-dom'
import {Home,CreatePost} from "./Pages/index.js"
// import {Card,Loader} from "./components/CompIndex.js"

const App = () => {
  return (
    <BrowserRouter>
    <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
      <Link to="/">
      <img  className="w-28 object-contain" src="https://cdn.iconscout.com/icon/free/png-256/free-openai-7601069-6138535.png?f=webp" alt="Logo"/>
      </Link>

      <Link to="/create-post" className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">Create</Link>
    </header>
    <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </main>
  </BrowserRouter>
);
  
}
export default App