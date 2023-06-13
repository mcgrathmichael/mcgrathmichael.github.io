import { useState } from "react";
import FetchButtons from "../../components/FetchButtons/FetchButtons";
import InputUserName from "../../components/InputUsername/InputUsername";

import "./HomePage.scss";

function HomePage() {
  const [ready, setReady] = useState(false);

  const isReady = (value) => {
    setReady(value);
  };

  return (
    <>
      <div className="title_container">
        <div className="header_text" id="Mashup">
          <span style={{ "--i": -4 }}>M</span>
          <span style={{ "--i": -3 }}>a</span>
          <span style={{ "--i": -4 }}>s</span>
          <span style={{ "--i": -1 }}>h</span>
          <span style={{ "--i": 0 }}>u</span>
          <span style={{ "--i": 1 }}>p</span>
          <span />
          <span style={{ "--i": 2 }}>M</span>
          <span style={{ "--i": 3 }}>e</span>
          <span style={{ "--i": 4 }}>m</span>
          <span style={{ "--i": 4 }}>o</span>
        </div>
      </div>

      <InputUserName isReady={isReady} />
      <FetchButtons isReady={ready} />
    </>
  );
}

export default HomePage;
