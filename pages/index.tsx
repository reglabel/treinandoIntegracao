import { useRouter } from 'next/router';
import {SubmitHandler, useForm} from 'react-hook-form'

interface SignInFormData{
  name: string,
  password: string,
}

function Home(){
  {/*const { register, handleSubmit, formState } = useForm()

  function handleSignIn<SignInFormData>(values: SignInFormData) {
    console.log(values)
  }*/}

  const { register, handleSubmit, formState} = useForm<SignInFormData>()

  const router = useRouter()

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000));

    router.push('/users')
    console.log(values);
  }

  return (
    <div>
      <h1>Bem-vindo</h1>

      <form onSubmit={handleSubmit(handleSignIn)}>
        <>
          <label htmlFor="signName">First name:</label><br/>
          <input type="text" id="signName" {...register('name')}/><br/>
          <label htmlFor="signPass">Senha:</label><br/>
          <input type="password" id="signPass" {...register('password')}/><br/>
          <button type='submit'>Entrar</button>
        </>
      </form>

      {formState.isSubmitSuccessful ? <p>Deu certo</p> : <p>Deu errado</p>}
    </div>
  )
}

export default Home
