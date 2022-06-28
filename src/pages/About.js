import React, { Component } from "react";
import "./About.css";
import pfp from "../assets/pfp.jpg";

export default class About extends Component {
  render() {
    return (
      <div>
        <div>
        <div class="split left">
          <div className="centered">
            <img
              className="profile_image"
              src = {pfp}
              alt="Profile Pic"
              ></img>
          </div>
        </div>
        <div className="split right">
          <div className="centered">
            <div className="name_title">Nicole Issagholian</div>
            <div className="brief_description">
              Hi! My name is Nicole Issagholian. I am a rising junior at NYU studying Math and Computer Science. In my free time, I like to cook, watch movies, listen to music, and spend time with my family. A fun fact about me is that I am Armenian so I am bilingual!
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}
