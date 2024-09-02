import React from "react";
import RadioButtons from "../components/RadioButtons";
import ToggleButtonGroups from "../components/ToggleButtonGroup";
import FormBoxes from "../components/FormBoxes";
import VotingResult from "../components/VotingResult";

const eatTheStreetWeekMenu =
  "https://widget.inisign.com/Widget/Customers/Customer.aspx?token=6e5cc038-e918-4f97-9a59-d2afa0456abf&scaleToFit=true";
const fresh4youWeekMenu =
  "https://widget.inisign.com/Widget/Customers/Customer.aspx?token=a8923cdb-9d92-46bc-b6a4-d026c2cf9a89&scaleToFit=true";
const flowWeekMenu =
  "https://widget.inisign.com/Widget/Customers/Customer.aspx?token=756a5aa2-a95f-4d15-ad5a-59829741075b&scaleToFit=true";

const eatTheStreetCurrentDayMenu = "https://widget.inisign.com/Widget/Customers/Customer.aspx?token=59db31f7-6775-43a1-a4bb-76a2bfb197ac&scaleToFit=true";
const fresh4youCurrentDayMenu = "https://widget.inisign.com/Widget/Customers/Customer.aspx?token=aa1358ee-d30e-4289-a630-892cd1210857&scaleToFit=true";
const flowCurrentDayMeny = "https://widget.inisign.com/Widget/Customers/Customer.aspx?token=4a0457f8-dbfa-4783-8ebe-b5ee0486843f&scaleToFit=true"

const LandingPage = () => {
  const [showWeekMenu, setShowWeekMenu] = React.useState<boolean>(true);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <ToggleButtonGroups selectedValue={showWeekMenu} handleSelectionChange={setShowWeekMenu} />
      <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr", height: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", height: "100%" }}>
          <div style={{ margin: "5px", height: "100%", position: 'relative' }}>
          {showWeekMenu ? <></> : <h2>Eat the street</h2>}
            <iframe src={showWeekMenu ? eatTheStreetWeekMenu : eatTheStreetCurrentDayMenu} width="100%" height="100%" title="Page 1"></iframe>
          </div>
          <div style={{ margin: "5px", height: "100%", position: 'relative' }}>
          {showWeekMenu ? <></> : <h2>Fresh</h2>}
            <iframe src={showWeekMenu ? fresh4youWeekMenu : fresh4youCurrentDayMenu} width="100%" height="100%" title="Page 2"></iframe>
            {/*             <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 999 }}>
              <RadioButtons />
            </div> */}
          </div>
          <div style={{ margin: "5px", height: "100%", position: 'relative' }}>
          {showWeekMenu ? <></> : <h2>Flow</h2>}
            <iframe src={showWeekMenu ? flowWeekMenu : flowCurrentDayMeny} width="100%" height="100%" title="Page 3"></iframe>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <FormBoxes />
          <VotingResult />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
