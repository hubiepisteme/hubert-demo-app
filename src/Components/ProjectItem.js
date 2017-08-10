import React, { Component } from 'react';

class ProjectItem extends Component {
  render() {
    console.log(this.props.project.title)
  return (
      <li className="Project">
        <strong>{this.props.project.title}</strong>: {this.props.project.category}
        ::: {this.props.project.type}
      </li>
    );
  }
}

export default ProjectItem;
