import registerImg from '../assets/register-img.svg'
import { RegisterForm } from "../components/RegisterForm"


export const RegisterPage = () => {

  return (
    <>
      <div className="hidden md:flex md:flex-col md:items-center md:-translate-y-6">
        <img src={registerImg} alt="register-img" className="size-[400px]" height={400} width={400} />
        <p className="text-sm text-primary/75 flex flex-col-reverse text-center pr-6"><span className="text-primary">AFP.</span> Aplicación de Finanzas Personales</p>
      </div>
      <RegisterForm />
    </>
  )

}
