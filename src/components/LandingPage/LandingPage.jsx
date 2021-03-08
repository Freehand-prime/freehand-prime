import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  const history = useHistory();

  const enterPersonRedirect = () => {
      //debug
    console.log('enterPersonRedirect: Clicked "Who do you Appreciate" on Landing Page - Directing to EnterPerson.')
      //redirect
    history.push('/person');
  };

  return (
    <div className="container">
      <div className="grid">
        <div className="grid-col grid-col_8">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            id felis metus. Vestibulum et pulvinar tortor. Morbi pharetra lacus
            ut ex molestie blandit. Etiam et turpis sit amet risus mollis
            interdum. Suspendisse et justo vitae metus bibendum fringilla sed
            sed justo. Aliquam sollicitudin dapibus lectus, vitae consequat odio
            elementum eget. Praesent efficitur eros vitae nunc interdum, eu
            interdum justo facilisis. Sed pulvinar nulla ac dignissim efficitur.
            Quisque eget eros metus. Vestibulum bibendum fringilla nibh a
            luctus. Duis a sapien metus.
          </p>
        </div>
        <div className="grid-col grid-col_4">
          <center>
            <button className="btn btn_sizeSm" onClick={enterPersonRedirect}>
              Who Do You Appreciate?
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}
