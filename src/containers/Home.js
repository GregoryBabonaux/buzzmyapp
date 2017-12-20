import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Home.css";

import { invokeApig } from '../libs/awsLib';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      photos: []
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const results = await this.photos();
      this.setState({ photos: results });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  photos() {
    return invokeApig({ path: "/photos" });
  }


  renderPhotosList(photos) {
    return [{}].concat(photos).map(
      (photo, i) =>
        i !== 0
          ? <ListGroupItem
              key={photo.photoId}
              href={`/photos/${photo.photoId}`}
              onClick={this.handlePhotoClick}
              header={photo.description.trim().split("\n")[0]}
            >
              {"Created: " + new Date(photo.createdAt).toLocaleString()}
            </ListGroupItem>
          : <ListGroupItem
              key="new"
              href="/photo/new"
              onClick={this.handlePhotoClick}
            >
              <h4>
                <b>{"\uFF0B"}</b> Create a new photo
              </h4>
            </ListGroupItem>
    );
  }

  handlePhotoClick = event => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute("href"));
  }

  renderLander() {
    return (
      <div className="lander">
        <h1>BuzzMyApp</h1>
        <p>Achetez des photos de chatons</p>
      </div>
    );
  }

  renderPhotos() {
    return (
      <div className="photos">
        <PageHeader>Vos Photos</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderPhotosList(this.state.photos)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderPhotos() : this.renderLander()}
      </div>
    );
  }
}