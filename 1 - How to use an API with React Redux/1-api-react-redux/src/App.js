import React from 'react';
import { Provider, useDispatch, useSelector } from "react-redux";
import { createStore } from "redux";
import './App.css';


const INITIAL_STATE = {
  text: '',
};
const rootReducer = (state, action) => {
  switch (action.type) {
    case 'analyzed':
      return {
        ...state,
        phrases: action.phrases,
        sentiments: action.sentiments,
        analyzedText: action.analyzedText,
      };
    case 'update-text':
      return {
        ...state,
        text: action.text,
      };
    default:
      return state;
  }
};
const store = createStore(
  rootReducer,
  INITIAL_STATE,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__()
);
function App() {
  return (
    <Provider store={store}>
      <div className='app'>
        <UserInput />
        <div className='results'>
          <VisualParagraph />
          <KeyPhraseList />
        </div>
      </div>
    </Provider>
  );
}


function UserInput() {
  const text = useSelector(state => state.text);
  const dispatch = useDispatch();
  const updateText = (e) => dispatch({
    type: 'update-text',
    text: e.target.value,
  });
  const analyzeText = async () => {
    const phrasesResult = await textAnalyticsRequest('keyPhrases', text);
    const sentimentsResult = await textAnalyticsRequest('sentiment', text);
    dispatch({
      type: 'analyzed',
      phrases: phrasesResult.keyPhrases,
      sentiments: sentimentsResult.sentences,
      analyzedText: text,
    });
  };
  return (
    <section>
      <h2>Paragraph to Analyze</h2>
      <textarea autoFocus onChange={updateText}></textarea>
      <div><button onClick={analyzeText}>Analyze Text</button></div>
    </section>
  );
}
function VisualParagraph() {
  const sentiments = useSelector(state => state.sentiments);
  const analyzedText = useSelector(state => state.analyzedText);
  const COLORS = {
    positive: 'green',
    neutral: 'orange',
    negative: 'red',
  };
  return (
    <section>
      <h2>Textual Mood</h2>
      <p>
        {sentiments && sentiments.map(({ sentiment, offset, length }) => {
          const subtext = analyzedText.substr(offset, length);
          const color = COLORS[sentiment];
          return <span key={offset} style={{ color }}>{subtext} </span>;
        })}
      </p>
    </section>
  );
}
function KeyPhraseList() {
  const phrases = useSelector(state => state.phrases);
  return (
    <section>
      <h2>Key Phrases</h2>
      {phrases &&
        <ul>
          {phrases.map(phrase => (
            <li key={phrase}>{phrase}</li>
          ))}
        </ul>
      }
    </section>
  );
}


async function textAnalyticsRequest(endpoint, text) {
  const url = "https://microsoft-text-analytics1.p.rapidapi.com/" + endpoint;
  const response = await fetch(url, {
    "method": "POST",
    "headers": {
      "x-rapidapi-host": "microsoft-text-analytics1.p.rapidapi.com",
      "x-rapidapi-key": "bd5d56c38fmsh383f119eba3676fp1e1c8ajsn2562c02648ec",
      "content-type": "application/json",
      "accept": "application/json"
    },
    "body": JSON.stringify({
      "documents": [{
        "id": "1",
        "language": "en",
        "text": text,
      }],
    }),
  });
  const body = await response.json();
  return body.documents[0];
}
export default App;