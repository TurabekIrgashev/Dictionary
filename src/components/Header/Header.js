import { Button, createMuiTheme, TextField, ThemeProvider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Header.css";
import MenuItem from "@material-ui/core/MenuItem";
import countries from "../../data/category";
import { debounce } from "lodash";
import axios from "axios";

const Header = ({
  category,
  setCategory,
  setWord,
  word,
  setMeanings,
  LightTheme,
  uzbMeaning,
  setEngMeaning,
  uzbWord,
  meanings,
  setUzbWord,
  setUzbMeaning,
  setLoader,
  setNoWord

}) => {
  const darkTheme = createMuiTheme({
    palette: {
      primary: {
        main: LightTheme ? "#000" : "#fff",
      },
      type: LightTheme ? "light" : "dark",
    },
  });

  const [change, setChange] = useState("")
  const [change2, setChange2] = useState("")

  useEffect(() => {
    if (change2) {
      console.log("change2");
      if (uzbWord) {
        axios.get(`https://lexicala1.p.rapidapi.com/search-entries?text=${uzbWord}&language=en`,
          {
            // headers: {
            //   'X-RapidAPI-Key': '470361e4bamsh4c09598441fdeecp1aea14jsn5eb6db81c21b',
            //   'X-RapidAPI-Host': 'lexicala1.p.rapidapi.com'
            // }
            headers: {
              'X-RapidAPI-Key': '9d00c2c592msh962c36d3bc07ac4p1da9c0jsn7c1b73d2d833',
              'X-RapidAPI-Host': 'lexicala1.p.rapidapi.com'
            }
            // headers: {
            //   'X-RapidAPI-Key': '65c36090f2msh5ab67f027ce0d78p18de4fjsn48c98651d031',
            //   'X-RapidAPI-Host': 'lexicala1.p.rapidapi.com'
            // }
          })
          .then((res) => {
            console.log("data2", res?.data);
            console.log("res2", res);
            if (res?.data?.results.length === 0 && category === "uz") {
              setLoader(false)
              setNoWord(true)
            }

            setEngMeaning(res?.data?.results[0]?.senses[0]?.definition)
          })

          .catch((err) => { console.log("error", err); })
      } else {
        console.log("else");
      }
    }
  }, [uzbWord, change2]);

  useEffect(() => {
    if (change) {
      if (category === "uz") {
      }
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
          q: `${word.toLowerCase()}`,
          source: `${category}`,
          target: "en"
        },

      };
      async function f1() {
        try {
          const response = await axios.request(options);
          console.log(response.data);
          setUzbWord(response?.data?.data?.translations?.translatedText);
          setChange2("changed")
          // console.log("setUzbword", response?.data?.data?.translations?.translatedText);
        } catch (error) {
          console.error(error);
          console.log("error");
        }
      }
      f1()

    }
  }, [word, uzbWord, change])


  const handleChange = (e) => {
    setCategory(e.target.value);
    // setWord("");
    setMeanings([]);
  };

  // const handleText = debounce((text) => {
  //   setWord(text);
  // }, 500);. 
  const handleText = (text) => {
    setChange("")
    setChange2("")
    if (word.length === 1) {
      console.log("clear");
      setMeanings("")
      setUzbMeaning("")
    }
    setWord(text)
  }
  const handleSubmitSearch = () => {
    setLoader(true)
    setChange("")
    setChange2("")
    setNoWord(false)
    console.log("fs");
    if (word && category && word.length >= 2) {
      axios.get(`https://lexicala1.p.rapidapi.com/search-entries?text=${word.toLowerCase()}&language=${category === "uz" ? ("en") : category}`,
        {
          // headers: {
          //   'X-RapidAPI-Key': '470361e4bamsh4c09598441fdeecp1aea14jsn5eb6db81c21b',
          //   'X-RapidAPI-Host': 'lexicala1.p.rapidapi.com'
          // }
          headers: {
            'X-RapidAPI-Key': '9d00c2c592msh962c36d3bc07ac4p1da9c0jsn7c1b73d2d833',
            'X-RapidAPI-Host': 'lexicala1.p.rapidapi.com'
          }
          // headers: {
          //   'X-RapidAPI-Key': '65c36090f2msh5ab67f027ce0d78p18de4fjsn48c98651d031',
          //   'X-RapidAPI-Host': 'lexicala1.p.rapidapi.com'
          // }
        })
        .then((res) => {
          console.log("data", res?.data);
          console.log("res", res);
          setMeanings(res?.data)
          setChange("changed")
          if (res?.data?.results.length !== 0) {
            setNoWord(false)
          }
          if (category !== "uz") {
            setLoader(false)
          }
        })

        .catch((err) => { console.log("error", err); })
    } else {
      console.log("else");
    }
  }

  return (
    <div className="header">
      <span className="title">{word ? word : "Explanatory dictionary"}</span>
      <div className="inputs">
        <ThemeProvider theme={darkTheme}>
          <TextField
            select
            label="Language"
            value={category}
            onChange={(e) => handleChange(e)}
            className="select"
          >
            {countries.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            disabled={category ? false : true}
            className="search"
            id="filled-basic"
            value={word}
            label="Search a Word"
            onChange={(e) => handleText(e.target.value)}
          />
          <Button
            style={{
              backgroundColor: LightTheme ? "#3b5360" : "white",
              color: LightTheme ? "white" : "black",
            }} onClick={handleSubmitSearch} size="small" variant="contained" theme={darkTheme}>
            <svg width="21px" height="20px" viewBox="0 0 21 20" version="1.1">
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Dribbble-Light-Preview" transform="translate(-259.000000, -280.000000)" fill={LightTheme ? "white" : "black"}>
                  <g id="icons" transform="translate(56.000000, 160.000000)">
                    <path d="M207.45515,134.343 L208.93985,135.757 L204.48575,140 L203,138.586 L207.45515,134.343 Z M215.6,134 C212.1266,134 209.3,131.308 209.3,128 C209.3,124.691 212.1266,122 215.6,122 C219.07445,122 221.9,124.691 221.9,128 C221.9,131.308 219.07445,134 215.6,134 L215.6,134 Z M215.6,120 C210.9611,120 207.2,123.582 207.2,128 C207.2,132.418 210.9611,136 215.6,136 C220.23995,136 224,132.418 224,128 C224,123.582 220.23995,120 215.6,120 L215.6,120 Z" id="search_right-[#1505]"></path>
                  </g>
                </g>
              </g>
            </svg></Button>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Header;
