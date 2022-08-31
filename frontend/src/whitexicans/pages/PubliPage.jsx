import React from 'react'
import { WhitexicansLayout } from '../../UI/layout/WhitexicansLayout'

export const PubliPage = () => {
  return (
    <>
        <WhitexicansLayout>
        <section id="about">
            <div className="container px-4 text-center mt-5">
                <div className="row gx-4 justify-content-center">
                    <div className="col-lg-8">
                        <h4 className='mb-3 ms-4'>GRACIAS POR VISITAR ESTA PÁGINA</h4>
                        <p className="lead mx-auto">La publicidad nos ayuda a mantener WhitexicansBlog, esto significa que gracias a la publicidad nosotros podemos implementar nuevas funcionalidades, así como tambien arreglar bugs (errores) y mejorar la experiencia de usuario.</p>
                    </div>
                </div>
            </div>
        </section>
        </WhitexicansLayout>
    </>
  )
}
