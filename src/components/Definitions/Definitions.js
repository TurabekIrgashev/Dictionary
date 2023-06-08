import React, { useState } from "react";
import "./Definitions.css";
import { Comment } from "react-loader-spinner";

const Definitions = ({ meanings, word, LightTheme, category, uzbMeaning, loader, noWord }) => {

  return (
    <div className="meanings">
      {loader ? (
        <div style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
          <Comment
            visible={true}
            height="150"
            width="150"
            ariaLabel="comment-loading"
            wrapperStyle={{}}
            wrapperClass="comment-wrapper"
            color="#000"
            backgroundColor="#e3e3e3"
          />
        </div>
      ) : (
        uzbMeaning ? (
          <div className="border"
            style={{
              backgroundColor: LightTheme ? "#3b5360" : "white",
              color: LightTheme ? "white" : "black",
            }}>
            <h3>Definition: {uzbMeaning}</h3>

          </div>

        ) : (
          word === "" ? (
            <span className="subTitle">Start by typing a word in search</span>
          ) : (
            <>
              {noWord ? (<div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}>
                <div className="border"
                  style={{
                    backgroundColor: LightTheme ? "#3b5360" : "white",
                    color: LightTheme ? "white" : "black",
                  }}>
                  <h3>The word is not available</h3>
                </div>
              </div>
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
                      <h3>Word: {mean?.headword?.text} Pos: {mean?.headword?.pos} </h3>
                      <h3>Pronunciation: {mean?.headword?.pronunciation?.value}</h3>
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

                )
              )}

            </>
          )
        )

      )}
    </div >
  );
};

export default Definitions;
