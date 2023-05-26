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
              <div className="border">
                <h3>Word: {mean.headword.text} Pos: {mean.headword.pos} </h3>
                <h3>Pronunciation: {mean.headword.pronunciation.value}</h3>
              </div>
              <div>
                {
                  mean.senses?.map((def) =>
                    <div>
                      {
                        (def.definition) ? (
                          <div className="border">
                            <h3>Definition: {def.definition}</h3>
                            <div>
                              {
                                (def.examples) ? (
                                  def.examples?.map((examples) =>
                                    <div>
                                      <h3>Example: {examples.text}</h3>
                                    </div>
                                  )
                                ) : (console.log("DefExamples"))
                              }
                            </div>
                          </div>
                        ) : (console.log("Definition"))
                      }

                      <div>
                        {
                          (def.composition_phrases !== "") ? (
                            def.compositional_phrases?.map((phrasesDef) =>
                              <div className="border">
                                <div>
                                  <h3>Compositional Phrases</h3>
                                  <h3>Text: {phrasesDef.text}</h3>
                                  {
                                    phrasesDef.definition ? (
                                      <h3>Definition: {phrasesDef.definition}</h3>
                                    ) : (console.log("Null"))
                                  }
                                  {
                                    phrasesDef.senses ? (
                                      phrasesDef.senses?.map((sensesDef) =>
                                        <h3>Definition: {sensesDef.definition}</h3>
                                      )
                                    ) : (console.log("sensesDef"))
                                  }
                                </div>
                                <div>
                                  {phrasesDef.examples?.map((examp) =>
                                    <div>
                                      <h3>Example: {examp.text}</h3>
                                      {/* {
                                      Object.keys(examp.translations)?.map((translation) =>
                                        <div>
                                          <h3>{translation.br}</h3>
                                        </div>
                                      )
                                    } */}
                                    </div>
                                  )}
                                </div>
                              </div>
                            )
                          ) : (console.log("Composition"))
                        }
                      </div>
                    </div>
                  )
                }
              </div>
            </div>
          ))
      }
    </div >
  );
};

export default Definitions;
