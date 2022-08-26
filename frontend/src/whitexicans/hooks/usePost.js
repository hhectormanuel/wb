import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../auth/context/AuthContext'

export const usePost = (id) => {

    const { user } = useContext(AuthContext);

    const [Info, setInfo] = useState({
        nombre: '',
        followers: [],
        follows: [],
        posts: [],
        isLoading: true
    })

    const getInfo = async() => {
        const profile = `http://127.0.0.1:8000/${id}`;
        const token = localStorage.getItem('token');
        const respuesta = await axios.get(profile,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setInfo({
            nombre: respuesta.data.user.username,
            followers: respuesta.data.followers,
            follows: respuesta.data.follows,
            posts: respuesta.data.posts,
            isLoading: false
        });
    }

    useEffect(() => {
      getInfo()
    }, []);

    const [Valor, setValor] = useState('Seguir');

    const getRespFollow = async() => {
      if(Info.isLoading === false){
          const search = Info.followers.find(follower=>follower.id === user.id);
          if(search){
              setValor('Siguiendo');
              getInfo();
          }else{
              setValor('Seguir');
              getInfo();
          }
    }
  };

  useEffect(() => {
      getRespFollow();
    }, [Info.isLoading]);
  
    const onFollowUser = async() => {
      const url = `http://127.0.0.1:8000/follow/${id}`;
      const token = localStorage.getItem('token');
      const respuesta = await axios.post(url,{
          
      },{
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });
      getInfo();
      if(Valor === 'Siguiendo'){
          setValor('Seguir')
      }else if(Valor === 'Seguir'){
          setValor('Siguiendo');
      }
    };

  return {
    Info, getInfo, Valor, onFollowUser
  }
}
