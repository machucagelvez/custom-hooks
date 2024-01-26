import { useState } from 'react'

export const useForm = (initialForm = {}) => {
  const [formState, setFormState] = useState(initialForm)

  const onInputChange = ({ target }) => {
    const { name, value } = target
    setFormState({
      ...formState,
      [name]: value,
    })
  }

  const onResetForm = () => {
    setFormState(initialForm)
  }

  return {
    // Se pueden enviar los elementos separados y el formState completo:
    formState,
    ...formState,
    onInputChange,
    onResetForm,
  }
}
