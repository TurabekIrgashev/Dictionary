import { Container, Switch, withStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Definitions from "./components/Definitions/Definitions";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

function App() {
  const [word, setWord] = useState("");
  const [meanings, setMeanings] = useState([]);
  const [engMeaning, setEngMeaning] = useState("");
  const [uzbMeaning, setUzbMeaning] = useState("");
  const [category, setCategory] = useState("");
  const [uzbWord, setUzbWord] = useState("")
  const [LightTheme, setLightTheme] = useState(false);
  const [loader, setLoader] = useState(false)
  const [noWord, setNoWord] = useState(false)


  useEffect(() => {
    if (category == "uz") {
      if (engMeaning) {
        console.log("100", engMeaning);
        const options = {
          method: 'Post',
          url: `https://deep-translate1.p.rapidapi.com/language/translate/v2`,
          // headers: {
          //   'content-type': 'application/json',
          //   'X-RapidAPI-Key': '470361e4bamsh4c09598441fdeecp1aea14jsn5eb6db81c21b',
          //   'X-RapidAPI-Host': 'deep-translate1.p.rapidapi.com'
          // },
          headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '65c36090f2msh5ab67f027ce0d78p18de4fjsn48c98651d031',
            'X-RapidAPI-Host': 'deep-translate1.p.rapidapi.com'
          },
          data: {
            q: `${engMeaning}`,
            source: "en",
            target: "uz"
          },

        };
        async function f1() {
          try {
            const response = await axios.request(options);
            console.log("117", response.data);
            setUzbMeaning(response?.data?.data?.translations?.translatedText)
            setLoader(false)
          } catch (error) {
            console.error(error);
            console.log("error");
          }
        }
        f1()
      }
    }

  }, [engMeaning])
  const PurpleSwitch = withStyles({
    switchBase: {
      color: grey[50],
      "&$checked": {
        color: grey[900],
      },
      "&$checked + $track": {
        backgroundColor: grey[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

  return (
    <div
      className="App"
      style={{
        height: "100vh",
        backgroundColor: LightTheme ? "#fff" : "#282c34",
        color: LightTheme ? "black" : "white",
        transition: "all 0.5s linear",
      }}
    >
      <Container
        maxWidth="md"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "space-evenly",
        }}
      >
        <div
          style={{ position: "absolute", top: 0, right: 15, paddingTop: 10 }}
        >
          <span>{LightTheme ? "Dark" : "Light"} Mode</span>
          <PurpleSwitch
            checked={LightTheme}
            onChange={() => setLightTheme(!LightTheme)}
          />
        </div>
        <Header
          setWord={setWord}
          category={category}
          setCategory={setCategory}
          word={word}
          setMeanings={setMeanings}
          LightTheme={LightTheme}
          uzbWord={uzbWord}
          setEngMeaning={setEngMeaning}
          meanings={meanings}
          setUzbWord={setUzbWord}
          setUzbMeaning={setUzbMeaning}
          setLoader={setLoader}
          setNoWord={setNoWord}
        />
        {meanings && (
          <Definitions
            meanings={meanings}
            word={word}
            LightTheme={LightTheme}
            category={category}
            uzbMeaning={uzbMeaning}
            loader={loader}
            noWord={noWord}
          />
        )}
      </Container>
      <Footer />
    </div>
  );
}

export default App;
