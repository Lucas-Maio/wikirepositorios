
import gitlogo from '../assets/github.png'
import { Container } from './style';
import Input from '../components/Input'
import Button from '../components/Button'
import ItemRepo from '../components/ItemRepo'
import { useState } from 'react';
import {api} from '../services/api'

function App() {
const [currentRepo, setCurrentRepo] = useState('');
const [repos, setRepos] = useState([]);

const handleSearchRepo = async () => {
    const {data} = await api.get(`repos/${currentRepo}`)

    if(data.id){

      const isExist = repos.find(repo => repo.id == data.id)

      if(!isExist) {
      setRepos(prev => [...prev, data])
      setCurrentRepo('')
      return
      }
    }
    alert('Repostório não encontrado')
}

  const handleRemoveRepo = (id) => {
    const removeRepo = repos.filter(repo => repo.id !== id)
    setRepos(removeRepo)
  }


  return (
    <Container>
      <img src={gitlogo} width={72} height={72} alt='github logo' />
      <Input
       value={currentRepo}
       onChange={e => setCurrentRepo(e.target.value)} // Captura corretamente o texto digitado
       placeholder="usuário/repositório"
      />
      <Button onClick={handleSearchRepo} />
      {repos.map(repo => (
        <ItemRepo key={repo.id} handleRemoveRepo={handleRemoveRepo} repo={repo} />
      ))}
    </Container>
  );
}

export default App;
