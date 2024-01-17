import React from 'react'

const coorNac = [
  {
    name: 'Arturo Martez',
    role: 'Coordinador Nacional',
    image:
      'https://res.cloudinary.com/er-landing-page/image/upload/v1704561590/images/arturo.png',
  },
]

const comNac = [
  {
    name: 'Urbano Caceres',
    role: 'Coordinador de Adiestramiento',
    image:
      'https://res.cloudinary.com/er-landing-page/image/upload/v1705461409/images/urbano.png',
  },
  {
    name: 'Luis Lopez',
    role: 'Coordinador de Alcance',
    image:
      'https://res.cloudinary.com/er-landing-page/image/upload/v1705461395/images/luis.png',
  },
  {
    name: 'Rafael Romero',
    role: 'Coordinador de Programa',
    image:
      'https://res.cloudinary.com/er-landing-page/image/upload/v1705461405/images/rafael.png',
  },
]

const teamNac = [
  {
    name: 'Giancarlos Arauz',
    role: 'Coordinador de Comunicaciones',
    image:
      'https://res.cloudinary.com/er-landing-page/image/upload/v1705461381/images/giancarlos.png',
  },
  {
    name: 'Blanca Agudo',
    role: 'Coordinador de Eventos',
    image:
      'https://res.cloudinary.com/er-landing-page/image/upload/v1705461362/images/blanca.png',
  },
  {
    name: 'Jose Dominguez',
    role: 'Coordinador de Servicio Cristiano',
    image:
      'https://res.cloudinary.com/er-landing-page/image/upload/v1705461390/images/jose.png',
  },
  {
    name: 'Jean Alabarca',
    role: 'Administrador',
    image:
      'https://res.cloudinary.com/er-landing-page/image/upload/v1705461386/images/jean.png',
  },
]

const cmDist = [
  {
    name: 'Marcos Sanchez',
    role: 'Coordinador distrito A1',
    image:
      'https://res.cloudinary.com/er-landing-page/image/upload/v1705461400/images/marcos.png',
  },
  {
    name: 'Edward Chiru',
    role: 'Coordinador distrito A3',
    image:
      'https://res.cloudinary.com/er-landing-page/image/upload/v1705461375/images/edward.png',
  },
  {
    name: 'Edgar Tapia',
    role: 'Coordinador distrito A4',
    image:
      'https://res.cloudinary.com/er-landing-page/image/upload/v1705461362/images/edgar',
  },
]

export const Neworg = () => {
  return (
    <div id="org" className="org">
      <div className="org-box">
        <div className="org-box-2">
          <h2 className="">Nuestra Organizacion Nacional</h2>
        </div>

        <div className="coorNac-container">
          {coorNac.map((person, index) => (
            <div key={index} className="coorNac-container-box">
              <div className="coorNac-container-box-imageCard">
                <img
                  src={person.image}
                  className="object-cover w-full h-full"
                  //   width={50}
                  //   height={50}
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                  }}
                  alt={person.name}
                />
              </div>
              <div className="coorNac-container-box-TextCard">
                <h3 className="">{person.name}</h3>
                <p className="">{person.role}</p>
              </div>
            </div>
          ))}
        </div>

        <br />

        <div className="comNac-container">
          {comNac.map((person, index) => (
            <div key={index} className="comNac-container-box">
              <div className="coorNac-container-box-imageCard">
                <img
                  src={person.image}
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                  }}
                  alt={person.name}
                />
              </div>
              <div className="coorNac-container-box-TextCard" style={{flex: 2}}>
                <h3 className="">{person.name}</h3>
                <p
                  className=""
                  style={{fontSize: '0.875rem', lineHeight: '1.25rem'}}
                >
                  {person.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        <br />

        <div className=" coorNac-container">
          {teamNac.map((person, index) => (
            <div key={index} className="coorNac-container-box">
              <div className="coorNac-container-box-imageCard">
                <img
                  src={person.image}
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                  }}
                  alt={person.name}
                />
              </div>
              <div className="coorNac-container-box-TextCard" style={{flex: 2}}>
                <h3 className="">{person.name}</h3>
                <p style={{fontSize: '0.875rem', lineHeight: '1.25rem'}}>
                  {person.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        <br />

        <div className=" coorNac-container">
          {cmDist.map((person, index) => (
            <div key={index} className="coorNac-container-box">
              <div className="coorNac-container-box-imageCard">
                <img
                  src={person.image}
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                  }}
                  alt={person.name}
                />
              </div>
              <div className="" style={{flex: 2}}>
                <h3 className="text-xl font-semibold ">{person.name}</h3>
                <p style={{fontSize: '0.875rem', lineHeight: '1.25rem'}}>
                  {person.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
