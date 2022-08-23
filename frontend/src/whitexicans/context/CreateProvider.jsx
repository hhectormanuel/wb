import React, { useState } from 'react'
import { CreateContext } from './CreateContex'
import axios from 'axios';
import { useEffect } from 'react';

export const CreateProvider = ({ children }) => {

    const [Categorias, setCategorias] = useState({
        data: [],
        isLoading: true
    });

    const getCategory = async() => {
        const url = 'http://127.0.0.1:8000/category/';
        const resp = await fetch(url);
        const data = await resp.json();
        setCategorias({
            data: data,
            isLoading: false
        });
    }

    useEffect(() => {
      getCategory();
    }, []);

    const createPublication = async(titulo, descripcion) => {
      const token = localStorage.getItem('token');
      const url = 'http://localhost:8000/post';
  
      try {
        const resp = await axios.post(url, { title: titulo, description: descripcion, category: 1  },{
          headers:{
            'Authorization': `Bearer ${token}`
           } 
        });
        
      } catch (error) {
        console.log(error)
      }
    };

  return (
    <CreateContext.Provider value={{ createPublication, Categorias: Categorias }}>
        { children }
    </CreateContext.Provider>
  )
}
