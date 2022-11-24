import { useGlobalContext } from "../context"
import { useState } from "react"


const Search = () => {
 
  const [text, setText] = useState('');
  const {setSearchTerm, fetchRandomMeal} = useGlobalContext()


  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text) {
      setSearchTerm(text)
    }
  }


  return (
    <header className="search-container">
      <form onSubmit={handleSubmit}> 
         <input className="form-input" type="text" value={text} onChange={handleChange} placeholder="type favorite meal"/>
         <button className="btn" type="submit">Search</button>
         <button className="btn btn-hipster" type="button" onClick={fetchRandomMeal}>Suprise Me!</button>
      </form>
    </header>
  )
}

export default Search