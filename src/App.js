import React, { Component } from 'react';
import Projects from './Components/Projects';
import ProjectItem from './Components/ProjectItem';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      projects1: [],
      projects2: []
    }
  }
  componentWillMount(){
    this.setState({
      projects1: [
        {
          title: 'Bussiness Website',
          category: 'Web Design'
        },
        {
          title: 'Social App',
          category: 'Mobile Development'
        },
        {
          title: 'Ecommerce Shopping Card',
          category: 'Web Development'
        }
      ],
      projects2: [
        {
          title: 'Bussiness Website',
          category: 'Web Design',
          type: ['not','defined']
        },
        {
          title: 'Social App',
          category: 'Mobile Development',
          type: 'not typish'
        },
        {
          title: 'Ecommerce Shopping Card',
          category: 'Web Development',
            type: 'type'
        }
      ]
    });
  }

  render() {
	return (
      <div className="App">
      Project1
        <Projects projects1 = {this.state.projects1}/>
      Projects2
        <Projects projects2 = {this.state.projects2}/>
      </div>
    );
  }
}

export default App;
