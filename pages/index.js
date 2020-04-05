import React from "react";
import ReactDOM from "react-dom";
import launchInformation from "../launch-list.json";
const quarters = {
  "1": "winter",
  "2": "spring",
  "3": "summer",
  "4": "autumn",
};
const months = {
  "1": "January",
  "2": "February",
  "3": "March",
  "4": "April",
  "5": "May",
  "6": "June",
  "7": "July",
  "8": "August",
  "9": "September",
  "10": "October",
  "11": "November",
  "12": "December",
};
const Index = () => {
  return (
    <div>
      <ul>
        <li className="header-li">
          <div className="index"></div>
          <div className="mission-name">Mission Name</div>
          <div className="rocket-name">Vehicle name</div>
          <div className="launch-site">Location</div>
          <div className="launch-time">Launch time</div>
          <div className="timer">Before/after launch</div>
        </li>
        {launchInformation && launchInformation.length !== 0
          ? launchInformation.map((elem, index) => {
              return (
                <li>
                  <div className="index">
                    {index + 1}. {"  "}
                  </div>
                  <div className="mission-name">
                    {elem["mission"] || "no information"}
                  </div>
                  <div className="rocket-name">
                    {elem["vehicle"] || "no information"}
                  </div>
                  <div className="launch-site">
                    {elem["location"] || "no information"}
                  </div>
                  <div className="launch-time">
                    {elem["launch"]["years"] || " "}{" "}
                    {elem["launch"]["months"]
                      ? months[elem["launch"]["months"]]
                      : ""}
                    {elem["launch"]["date"]
                      ? ", " + elem["launch"]["date"]
                      : ""}{" "}
                    {elem["launch"]["hours"]
                      ? "at " + elem["launch"]["hours"]
                      : " "}
                    {elem["launch"]["minutes"]
                      ? ":" + elem["launch"]["minutes"]
                      : ""}{" "}
                    {elem["launch"]["quarter"]
                      ? "(" + quarters[elem["launch"]["quarter"]] + ")"
                      : ""}
                  </div>
                  <div className="timer"></div>
                </li>
              );
            })
          : null}
      </ul>
    </div>
  );
};
ReactDOM.render(<Index />, document.querySelector("#root"));
