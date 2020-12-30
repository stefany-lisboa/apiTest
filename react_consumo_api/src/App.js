import React, { Component } from 'react';
import api from './api';

class App extends Component{

  state = {
    artigos: [],
  }

  async componentDidMount(){
    const response = await api.get('/');

    //console.log(response.data);

    this.setState({artigos: response.data})
  }
  render(){

    const {artigos} = this.state;

    console.log(artigos)

    return(
      <div>
        <h1>Listar artigos
          <ul style={{listStyleType: 'none', margin: 0, padding: 0}}>
            {artigos.map(artigo => (
              <li key={artigo._id}>
                <h2>Título: {artigo.titulo}</h2>
                <p>Conteudo: {artigo.conteudo}</p>
              </li>
            ))}
          </ul>
        </h1>
      </div>
    )
  }
}

export default App;
