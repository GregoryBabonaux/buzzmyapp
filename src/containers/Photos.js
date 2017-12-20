import React, { Component } from "react";
import { invokeApig } from "../libs/awsLib";

export default class Notes extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      photo: null,
      content: ""
    };
  }

  async componentDidMount() {
    try {
      const results = await this.getPhoto();
      this.setState({
        photo: results,
        content: results.content
      });
    } catch (e) {
      alert(e);
    }
  }

  getPhoto() {
    return invokeApig({ path: `/photos/${this.props.match.params.id}` });
  }

  render() {

    console.log(this.state.photo)

    return this.state.photo != null ?
          <div className="Notes">
          <img src={this.state.photo.photo} /> 
          <p>
            {this.state.photo.description }
          </p>
        </div>

        : <div></div>
  }
}