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
  useEffect(() => {
    console.log(word, category);
    if (word && category) {
      axios.get(`https://lexicala1.p.rapidapi.com/search-entries?text=${word}&language=${category === "uz" ? ("en") : category}`,
        {
          headers: {
            'X-RapidAPI-Key': '470361e4bamsh4c09598441fdeecp1aea14jsn5eb6db81c21b',
            'X-RapidAPI-Host': 'lexicala1.p.rapidapi.com'
          }
        })
        .then((res) => {
          console.log("data", res?.data);
          console.log("res", res);
          setMeanings(res?.data)
        })

        .catch((err) => { console.log("error", err); })
    } else {
      console.log("else");
    }
  }, [word, category]);

  useEffect(() => {
    // console.log(word, category);
    console.log(uzbWord);
    if (uzbWord) {
      axios.get(`https://lexicala1.p.rapidapi.com/search-entries?text=${uzbWord}&language=en`,
        {
          headers: {
            'X-RapidAPI-Key': '470361e4bamsh4c09598441fdeecp1aea14jsn5eb6db81c21b',
            'X-RapidAPI-Host': 'lexicala1.p.rapidapi.com'
          }
        })
        .then((res) => {
          console.log("data2", res?.data);
          console.log("res2", res);

          setEngMeaning(res?.data?.results[0]?.senses[0]?.definition)
        })

        .catch((err) => { console.log("error", err); })
    } else {
      console.log("else");
    }
  }, [uzbWord]);

  useEffect(() => {
    console.log("category", category);
    if (category === "uz") {
      const options = {
        method: 'Post',
        url: `https://deep-translate1.p.rapidapi.com/language/translate/v2`,
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': '470361e4bamsh4c09598441fdeecp1aea14jsn5eb6db81c21b',
          'X-RapidAPI-Host': 'deep-translate1.p.rapidapi.com'
        },
        data: {
          q: `${word}`,
          source: `${category}`,
          target: "en"
        },

      };
      async function f1() {
        try {
          const response = await axios.request(options);
          console.log(response.data);
          setUzbWord(response?.data?.data?.translations?.translatedText);
          // console.log("setUzbword", response?.data?.data?.translations?.translatedText);
        } catch (error) {
          console.error(error);
          console.log("error");
        }
      }
      f1()
    }
  }, [word, uzbWord])
  // console.log("1", meanings.results);


  useEffect(() => {
    if (engMeaning) {
      console.log("100", engMeaning);
      const options = {
        method: 'Post',
        url: `https://deep-translate1.p.rapidapi.com/language/translate/v2`,
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': '470361e4bamsh4c09598441fdeecp1aea14jsn5eb6db81c21b',
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
        } catch (error) {
          console.error(error);
          console.log("error");
        }
      }
      f1()
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
        />
        {meanings && (
          <Definitions
            meanings={meanings}
            word={word}
            LightTheme={LightTheme}
            category={category}
            uzbMeaning={uzbMeaning}
          />
        )}
      </Container>
      <Footer />
    </div>
  );
}

export default App;
