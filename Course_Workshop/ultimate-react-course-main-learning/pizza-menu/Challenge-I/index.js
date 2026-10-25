import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

// import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
const skillList = ["HTML", "CSS", "JavaScript", "React"];
const colorList = ["red", "green", "yellow", "orange"];
const emojiMap = new Map([
  [0, "👶"],
  [1, "👍"],
  [2, "💪"],
]);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);

function App() {
  return (
    <div className="card">
      <Avatar
        img_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4vL7lGJXbNIC4DPkotsd08BymABr60jnEriwLvpzCNg&s=10"
        img_alt="developer"
      />
      <div className="data">
        <Intro name="Game Developer" details="Sample Text" />
        <Skillset skillset={skillList} />
      </div>
    </div>
  );
}

function Avatar(props) {
  return (
    <div className="avatar">
      <img src={props.img_url} alt={props.img_alt} />
    </div>
  );
}

function Intro(props) {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>{props.details}</p>
    </div>
  );
}

function Skillset(props) {
  return (
    <div className="skill-list">
      {props.skillset.map((sk, idx) => {
        const color = colorList[idx];
        const skill = sk + emojiMap.get(idx);
        return <Skill key={idx} color={color} skill={skill} />;
      })}
    </div>
  );
}

function Skill(props) {
  return (
    <div style={{ backgroundColor: props.color }} className="skill">
      {props.skill}
    </div>
  );
}

/* <div style={{ backgroundColor: "red" }} className="skill">
  html
</div> */

// function Skillset(props) {
//   // return <p>Sample Text</p>;
//   return (
//     <div className="skill-list">
//       {props.skillset.map((skill, idx) => {
//         return (
//           <div style={{ backgroundColor: {colorList.indexOf(idx)} }} className="skill">
//             {skill}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// function Skillset(props) {
//   // return <p>Sample Text</p>;
//   return (
//     <div className="skill-list">
//       <div style={{ backgroundColor: props.color }} className="skill">
//         {props.skill}
//       </div>
//     </div>
//   );
// }

{
  /* <Skillset
          skillset={skillList}
          colorList={colorList}
          emojiList={emojiList}
        /> */
}

{
  /* {skillList.map((sk, idx) => {
          const skillWithEmoji = sk + emojiList[idx];
          const backgroundColor = colorList[idx];

          return <Skillset skill={skillWithEmoji} color={backgroundColor} />;
        })} */
}
