import React from "react";
import RadioButtons from "../components/RadioButtons";

const url1 =
  "https://widget.inisign.com/Widget/Customers/Customer.aspx?token=6e5cc038-e918-4f97-9a59-d2afa0456abf&scaleToFit=true";
const url2 =
  "https://widget.inisign.com/Widget/Customers/Customer.aspx?token=a8923cdb-9d92-46bc-b6a4-d026c2cf9a89&scaleToFit=true";
const url3 =
  "https://widget.inisign.com/Widget/Customers/Customer.aspx?token=756a5aa2-a95f-4d15-ad5a-59829741075b&scaleToFit=true";

const LandingPage = () => {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr", height: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", height: "100%" }}>
          <div style={{ margin: "5px", height: "100%", position: 'relative' }}>
            <iframe src={url1} width="100%" height="100%" title="Page 1"></iframe>
          </div>
          <div style={{ margin: "5px", height: "100%", position: 'relative' }}>
            <iframe src={url2} width="100%" height="100%" title="Page 2"></iframe>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 999 }}>
              <RadioButtons />
            </div>
          </div>
          <div style={{ margin: "5px", height: "100%", position: 'relative' }}>
            <iframe src={url3} width="100%" height="100%" title="Page 3"></iframe>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          {/* statistikk her */}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
