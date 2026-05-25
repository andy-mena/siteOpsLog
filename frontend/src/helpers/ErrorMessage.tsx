import type React from "react"

function ErrorMessage({children} : {children: React.ReactNode}) {
  return (
    <div className="text-sm text-red-400 w-full">
        {children}
    </div>
  )
}

export default ErrorMessage
