import { useContext } from 'react'
import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthContext } from '../auth/context/AuthContext'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { CheckingAuth } from '../UI/CheckingAuth'
import { useAuthStore } from '../whitexicans/hooks/useAuthStore'
import { WhitexicansRoutes } from '../whitexicans/routes/WhitexicansRoutes'

export const AppRouter = () => {

    const { checkAuthToken } = useAuthStore();

    const { user } = useContext(AuthContext);

    useEffect(() => {
      checkAuthToken();
    }, [])
    
    if(user.status === 'checking' || undefined){
        return (
            <CheckingAuth/>
        )
    }else if(user.status === 'auth'){
      return (
        <Routes>
          <Route path="/*" element={ <WhitexicansRoutes /> } />
        </Routes>
      )
    }

    return(
      <Routes>
        <Route path="/auth/*" element={ <AuthRoutes /> } />
        <Route path='/*' element={<Navigate to='/auth/login'></Navigate>}></Route>
      </Routes>
    )

  // return (
  //   <Routes>
  //   {
  //       user.status ==='auth'
  //       ? <Route path="/*" element={ <WhitexicansRoutes /> } />
  //       :<Route path="/auth/*" element={ <AuthRoutes /> } />
  //   }
  //   <Route path='/*' element={<Navigate to='/auth/login'></Navigate>}></Route>
  //   </Routes>
  // )
}
