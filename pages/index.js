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
const timeBetweenDates = (launch, now) => {
  let diff = Math.abs(launch - now);
  let diffMonth = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  diff -= diffMonth * 1000 * 60 * 60 * 24 * 30;
  let diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= diffDays * 1000 * 60 * 60 * 24;
  let diffHours = Math.floor(diff / (1000 * 60 * 60));
  diff -= diffHours * 1000 * 60 * 60;
  let diffMinutes = Math.floor(diff / (1000 * 60));

  return `${diffMonth} month(s), ${diffDays} day(s), ${diffHours} hour(s), ${diffMinutes} minute(s) 
    ${launch > now ? "left" : "passed"}`;
};

const Index = () => {
  const [nowTime, setNowTime] = React.useState(Date.now());
  React.useEffect(() => {
    const interval = setInterval(() => setNowTime(Date.now()), 1000 * 60);
    return () => {
      clearInterval(interval);
    };
  }, [setNowTime]);
  return (
    <div>
      <ul>
        <li className="header-li">
          <div className="index"></div>
          <div className="mission-name">Mission Name</div>
          <div className="rocket-name">Vehicle name</div>
          <div className="launch-site">Location</div>
          <div className="launch-time">Launch time</div>
          <div className="timer">Before/after launch timer</div>
        </li>
        {launchInformation && launchInformation.length !== 0
          ? launchInformation.map((elem, index) => {
              const launchDate = new Date(`${elem["launch"]["years"] || 0}-${
                elem["launch"]["months"] || 1
              }-${elem["launch"]["date"] || 1}${" "}${
                elem["launch"]["hours"] || 0
              }:${elem["launch"]["minutes"] || 0}
            `).getTime();
              console.log(`${elem["launch"]["years"] || 0}-${
                elem["launch"]["months"] || 0
              }-${elem["launch"]["date"] || 0}${" "}${
                elem["launch"]["hours"] || 0
              }:${elem["launch"]["minutes"] || 0}
            `);
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
                  <div className="timer">
                    {elem["launch"]["months"]
                      ? timeBetweenDates(launchDate, nowTime)
                      : "the exact launch date is unknown"}
                  </div>
                </li>
              );
            })
          : null}
      </ul>
    </div>
  );
};
ReactDOM.render(<Index />, document.querySelector("#root"));
