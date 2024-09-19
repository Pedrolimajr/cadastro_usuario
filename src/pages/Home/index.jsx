import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/Trash.png'
import api from '../../services/api'

/*Obs: se Eu não usar o useState, um estado do react (users) ele não iria atualizar em tempo real, toda vez que eu quero que uma variavel mude ou atualize eu preciso usar o useState.  */
 /* react kook - useRef (Ele coloca um elemento com oreferência pra ele e ai conseguiremos pegar as informações desse elemento ) */

 function Home() {
 const [users, setUsers] = useState([]) /* a variavel users é o estará os dados, e o setUsers é o responsável por colocar os dados dentro da variavel.  */
const inputName = useRef()
const inputAge = useRef()
const inputEmail = useRef()

/*getUsers - chama novos usuários*/
  async function getUsers() {
    const usersFromApi = await api.get('/usuarios')
    setUsers(usersFromApi.data)
    
    }
/* Função createUsers para criar um novo usuário (pegando os dados do Back-end) */
    async function createUsers() {
      await api.post('/usuarios', {
        name: inputName.current.value,
        age: inputAge.current.value,
        email: inputEmail.current.value
      })
      getUsers() /*Depois de criar a função de criação de novo usuário, chamo abaixo o getUsers para atualizar automaticamente no navegador.*/
      
      }

/* Função para deletar um usuário */
async function deleteUsers(id) {
await api.delete(`/usuarios/${id}`);
getUsers()
  }

  
useEffect(() => {
  getUsers()
}, [])

/*Abaixo o código HTML e Js, de acima códigos Js puro.*/
  return (
    <div className='container'>
      <form action="">
        <h1>Cadastro de usuários</h1>
        <input placeholder='Nome' name='nome' type='text' ref={inputName} />
        <input placeholder='Idade' name='idade' type='number' ref={inputAge}  />
        <input placeholder='E-mail' name='email' type='email' ref={inputEmail}  />
        <button type='button'onClick={createUsers} >Cadastrar</button>
      </form>
      {users.map((user) => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.idade}</span></p>
            <p>Emial: <span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)}> 
            <img src={Trash} />
          </button>
        </div>))}

    </div>
  )
}

export default Home
