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
  const [category, setCategory] = useState("");
  const [LightTheme, setLightTheme] = useState(false);


  // const dictionaryApi = async () => {
  //   try {
  //     const data = await axios.get(
  //       `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
  //     );
  //     setMeanings(data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // console.log(meanings);

  useEffect(() => {
    // dictionaryApi();
    // eslint-disable-next-line
    console.log(word, category);
    if (word && category) {
      axios.get(`https://lexicala1.p.rapidapi.com/search-entries?text=${word}&language=${category}`,
        {
          headers: {
            'X-RapidAPI-Key': '9d00c2c592msh962c36d3bc07ac4p1da9c0jsn7c1b73d2d833',
            'X-RapidAPI-Host': 'lexicala1.p.rapidapi.com'
          }
        })
        .then((res) => {
          console.log("data", res?.data);
          setMeanings(res?.data)
        })

        .catch((err) => { console.log("error", err); })
    } else {
      console.log("else");
    }
  }, [word, category]);
  console.log("1", meanings.results);
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
          />
        )}
      </Container>
      <Footer />
    </div>
  );
}

export default App;
