import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
const AppContext = React.createContext();


const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'

const AppProvider = ({children}) => {

      const [meals, setMeals] = useState([])
      const [loading, setLoading] = useState(false)
      const [searchTerm, setSearchTerm] = useState('')

      //Fetch API
      // const fetchMeals = async() => {
      //       try {
      //             const response = await fetch('https://randomuser.me/api/')
      //             const data = await response.json()
      //             console.log(data);
      //       } catch (error) {
      //             console.log(error);
      //       }
      // }

      //AXIOS library
      const fetchMeals = async(url) => {
            setLoading(true)
            try {
                  const {data} = await axios(url)
                  if(data.meals) {
                        setMeals(data.meals)
                  }
                  else {
                        setMeals([])
                  }
            } 
            catch (error) {
                  console.log(error.response);
            }
            setLoading(false)
      }
      
  
      const fetchRandomMeal = () => {
            fetchMeals(randomMealUrl)
      }


      useEffect(() => { 
            // fetchMeals(allMealsUrl)
            fetchMeals(`${allMealsUrl}${searchTerm}`)
      },[searchTerm])


      


      return (
            <AppContext.Provider value={{loading, meals, setSearchTerm, fetchRandomMeal}}>
                  {children}
            </AppContext.Provider>
      )
}


export const useGlobalContext = () => {
      return useContext(AppContext)
 }

export {AppContext, AppProvider}