import React from "react";
import "./Definitions.css";

const Definitions = ({ meanings, word, LightTheme, category }) => {
  return (
    <div className="meanings">
      {
        word === "" ? (
          <span className="subTitle">Start by typing a word in search</span>
        ) : (
          meanings.results?.map((mean) =>
            <div
              id="mean.id"
              className="singleMean"
              style={{
                backgroundColor: LightTheme ? "#3b5360" : "white",
                color: LightTheme ? "white" : "black",
              }}
            >
              <div>
                <h3>Word: {mean.headword.text} Pos: {mean.headword.pos} </h3>
                <h3>Pronunciation: {mean.headword.pronunciation.value}</h3>
              </div>
              <div>
                {
                  mean.senses?.map((def) =>
                    <div>
                      {
                        (def.definition !== "") ? (
                          <h3>Definition: {def.definition}</h3>
                        ) : (console.log())
                      }
                      <div>
                        {
                          def.compositional_phrases?.map((phrasesDef) =>
                            <div>
                              <div>
                                <h3>Compositional Phrases</h3>
                                <h3>Text: {phrasesDef.text}</h3>
                                {
                                  phrasesDef.definition !== "" ? (
                                    <h3>Definition: {phrasesDef.definition}</h3>
                                  ) : (console.log())
                                }
                              </div>
                              <div>
                                {phrasesDef.examples?.map((examp) =>
                                  <div>
                                    <h3>Example: {examp.text}</h3>
                                    {
                                    }
                                  </div>
                                )}
                              </div>
                            </div>
                          )

                        }
                      </div>
                    </div>
                  )
                }
              </div>
            </div>
          ))
      }
      )
    </div >
  );
};

export default Definitions;
