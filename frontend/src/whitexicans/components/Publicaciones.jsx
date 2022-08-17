import React from 'react'

export const Publicaciones = () => {
  return (
    <div className="container flex flex-col h-screen my-auto items-center bgimg bg-cover mt-8">
<div className="bg-white p-4 rounded-lg shadow hover:shadow-xl transition-all w-full md:w-1/2">
  <div>
    <img 
      src="https://img.freepik.com/foto-gratis/programador-sonriente-tiro-medio-sosteniendo-telefono_23-2149101155.jpg?w=2000&t=st=1660331259~exp=1660331859~hmac=4a6b4885e8141e344e237674190db60aa4431782337bc5df8a22e9d895ebdd6f" 
      className="w-full md:w-[500px] h-full md:h-[300px] object-cover rounded-lg" 
      alt="" 
    />
  </div>
  <div className="mt-4 flex flex-col gap-2">
    <span className="text-blue-600 uppercase font-semibold text-xs">
      Producto
    </span>
    <a href="#" className="text-2xl font-semibold hover:underline">
      Contruí un blog exitoso en un año
    </a>
    <p className="text-gray-600">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac
      aliquam ligula. Sed et massa pulvinar, interdum leo id, maximus
      lorem. Donec aliquet auctor turpis ut aliquet. Donec accumsan eu
      ipsum a vehicula.
    </p>
    <div className="mt-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img 
          src="https://img.freepik.com/foto-gratis/retrato-hermoso-mujer-joven-posicion-pared-gris_231208-10760.jpg?w=2000&t=st=1660333883~exp=1660334483~hmac=70d21d08617e34074243187ec59df8fd4b564c084f33609c6db242de4e40fc01"
          className="w-[40px] h-[40px] object-cover rounded-full"
          alt="Yared Jacquez Trillo"
        />
        <div>
          <span>Yared Jacquez Trillo</span>
        </div>
      </div>
      <div>
        <p className="uppercase text-gray-600 text-sm">19 sep 2022</p>
      </div>
    </div>
  </div>
</div>
    </div>

  )
}
