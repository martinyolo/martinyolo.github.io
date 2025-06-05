import React from "react";
import ToggleButtonGroups from "../components/ToggleButtonGroup";
import FormBoxes from "../components/FormBoxes";
import VotingResult from "../components/VotingResult";
import flowImage from "../img/flow.jpg";
import eatTheStreetImage from "../img/eat_the_street.jpg";
import fresh4youImage from "../img/fresh_4_You.jpg";

const eatTheStreetWeekMenu =
  "https://widget.inisign.com/Widget/Customers/Customer.aspx?token=6e5cc038-e918-4f97-9a59-d2afa0456abf&scaleToFit=true";
const fresh4youWeekMenu =
  "https://widget.inisign.com/Widget/Customers/Customer.aspx?token=a8923cdb-9d92-46bc-b6a4-d026c2cf9a89&scaleToFit=true";
const flowWeekMenu =
  "https://widget.inisign.com/Widget/Customers/Customer.aspx?token=756a5aa2-a95f-4d15-ad5a-59829741075b&scaleToFit=true";

const eatTheStreetCurrentDayMenu = "https://widget.inisign.com/Widget/Customers/Customer.aspx?token=bbf807d7-b1ed-4493-8853-e40077f6adde&scaleToFit=true";
const fresh4youCurrentDayMenu = "https://widget.inisign.com/Widget/Customers/Customer.aspx?token=aa1358ee-d30e-4289-a630-892cd1210857&scaleToFit=true";
const flowCurrentDayMenu = "https://widget.inisign.com/Widget/Customers/Customer.aspx?token=4a0457f8-dbfa-4783-8ebe-b5ee0486843f&scaleToFit=true"

const LandingPage = () => {
  const [showWeekMenu, setShowWeekMenu] = React.useState<boolean>(false);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <ToggleButtonGroups selectedValue={showWeekMenu} handleSelectionChange={setShowWeekMenu} />
      <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr", height: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", height: "90%" }}>
          <div style={{ margin: "5px", height: "100%", position: 'relative' }}>
            {showWeekMenu ? <></> : <img src={eatTheStreetImage} alt="EatTheStreet" style={{ maxWidth: "100%", height: "100px", objectFit: "cover" }}/>}
            <iframe src={showWeekMenu ? eatTheStreetWeekMenu : eatTheStreetCurrentDayMenu} width="100%" height="100%" title="Page 1"></iframe>
          </div>
          <div style={{ margin: "5px", height: "100%", position: 'relative' }}>
            {showWeekMenu ? <></> : <img src={fresh4youImage} alt="Logo of Fresh4You restaurant" style={{ maxWidth: "100%", height: "100px", objectFit: "cover" }}/>}
            <iframe src={showWeekMenu ? fresh4youWeekMenu : fresh4youCurrentDayMenu} width="100%" height="100%" title="Page 2"></iframe>
          </div>
          <div style={{ margin: "5px", height: "100%", position: 'relative' }}>
            {showWeekMenu ? <></> : <img src={flowImage} alt="Flow" style={{ maxWidth: "100%", height: "100px", objectFit: "cover" }} />}
            <iframe src={showWeekMenu ? flowWeekMenu : flowCurrentDayMenu} width="100%" height="100%" title="Page 3"></iframe>
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
