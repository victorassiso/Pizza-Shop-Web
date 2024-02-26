import { useEffect, useState } from 'react'
import { MdDeliveryDining } from 'react-icons/md'
import { ClipLoader } from 'react-spinners'

export function Loading() {
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center gap-20 text-foreground opacity-50">
      <div className="relative flex items-center justify-center">
        <MdDeliveryDining size={80} />
        <ClipLoader
          size={150}
          className="absolute"
          color="hsl(var(--foreground))"
        />
      </div>
      {showMessage && (
        <div className="mx-10 flex flex-col gap-3">
          <span className="flex justify-center text-2xl font-bold">
            ⚠ Atenção !
          </span>
          <p className="max-w-screen-md text-justify">
            Este projeto é hospedado em um plano gratuito, o que pode causar um
            atraso de até <strong>1 minuto</strong> no carregamento inicial. Mas
            não se preocupe! Após a primeira requisição, as demais funcionarão
            normalmente, sem atrasos. Pode confiar! 😉
          </p>
        </div>
      )}
    </div>
  )
}
