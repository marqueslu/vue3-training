interface setupPayload {
  onProduction: () => void
  onDevelopment: () => void
}

export function setup ({ onProduction, onDevelopment }: setupPayload) {
  console.log(process.env.NODE_ENV)
  if (process.env.NODE_ENV !== 'production') {
    onDevelopment()
    return
  }

  onProduction()
}
