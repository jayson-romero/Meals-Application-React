import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
const AppContext = React.createContext();


const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'

const AppProvider = ({children}) => {

      const [meals, setMeals] = useState([])
      const [loading, setLoading] = useState(false)
      const [searchTerm, setSearchTerm] = useState('')
      const [showModal, setShowModal] = useState(false)
      const [selectedMeal, setSelectedMeal] = useState(null)
      const [favorites, setFavorites] = useState([])

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


      const selectMeal = (idMeal, favoriteMeal) => {
            let meal;
            meal = meals.find((meal) => meal.idMeal === idMeal);

            setSelectedMeal(meal)
            setShowModal(true)
      }

      const closeModal = () => {
            setShowModal(false)
      }


      const addToFavorites = (idMeal) => {
            console.log(idMeal);
            const meal = meals.find((meal) => meal.idMeal === idMeal);
            const alreadyFavorite = favorites.find((meal) => meal.idMeal === idMeal);
            if(alreadyFavorite) return
                  const updateFavorites = [...favorites, meal]
            setFavorites(updateFavorites)
      }

      const removeFromFavorites = (idMeal) => {
            const updatedFavorites = favorites.filter((meal) => meal.idMeal !== idMeal)
            setFavorites(updatedFavorites)
      }
      



      useEffect(() => { 
            fetchMeals(allMealsUrl)   
      },[])

      useEffect(() => { 
            if(!searchTerm) return
            fetchMeals(`${allMealsUrl}${searchTerm}`)
      },[searchTerm])


   

      return (
            <AppContext.Provider value={{loading, meals, setSearchTerm, fetchRandomMeal, showModal, selectedMeal, selectMeal, closeModal, addToFavorites, removeFromFavorites, favorites}}>
                  {children}
            </AppContext.Provider>
      )
}


export const useGlobalContext = () => {
      return useContext(AppContext)
 }

export {AppContext, AppProvider}