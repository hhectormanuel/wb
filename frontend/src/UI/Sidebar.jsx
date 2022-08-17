import { useEffect, useState } from "react";
import { useScreenSize } from "../hooks/useScreenSize";
import { Publicaciones } from "../whitexicans/components/Publicaciones";

export const Sidebar = () => {

  const { width, height } = useScreenSize();

    const [open, setOpen] = useState(true);
    const Menus = [
      { title: "Publicaciones", src: "Publicaciones" },
      { title: "Cerrar Sesión", src: "Logout" },
    ];

    const getSizeScreen = () => {
      if(width >= 857) {
        setOpen(true);
      };
  
      if(width <= 856){
        setOpen(false);
      }
    };

    useEffect(() => {
      getSizeScreen();
    }, [width])
    

  return (
        <div className="flex">
            <div className={` ${ open ? "w-72" : "w-20 "}  bg-green-600 font-semibold h-screen p-5  pt-8 relative duration-300`}>
                {/* <img src="./src/assets/control.png" className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full  ${!open && "rotate-180"}`} onClick={() => setOpen(!open)}/> */}
                <div className="flex gap-x-4 items-center">
                <img src="./src/assets/logo.png" className={`cursor-pointer duration-500 ${ open && "rotate-[360deg]" }`}/>
                <h1 className={`text-white origin-left font-medium text-xl duration-200 ${ !open && "scale-0" }`}> NombreUsuario</h1>
            </div>

        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li key={index} className={`flex  rounded-md p-2 cursor-pointer hover:bg-green-800 text-white text-xl items-center gap-x-4  ${Menu.gap ? "mt-9" : "mt-2"} ${ index === 0 && "bg-light-white" } `}>
              <img src={`./src/assets/${Menu.src}.png`} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>{Menu.title}</span>
            </li>
          ))}
        </ul>
      </div>
      <Publicaciones/>
    </div>
  )
}
