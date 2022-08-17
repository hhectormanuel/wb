import React from 'react'

export const Navbar = () => {
  return (
    <div className="w-full bg-green-700 p-4 flex flex-col xl:flex-row gap-4 items-center justify-center md:justify-between">
    <h1 className="text-white uppercase font-semibold cursor-pointer text-xl">
    WHITEXICANS
    </h1>
    <nav className="flex items-center gap-4">
        <a
            href="#"
            className="xl:py-1 text-white xl:px-2 rounded-lg hover:bg-green-800 transition-colors"
        >
            Inicio
        </a>
        <a
            href="#"
            className="xl:py-1 text-white xl:px-2 rounded-lg hover:bg-green-800 transition-colors"
        >
            Contacto
        </a>
    </nav>
</div>
  )
}
