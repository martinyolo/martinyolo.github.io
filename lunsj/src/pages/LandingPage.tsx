import React, { useEffect, useState } from "react";
import axios from "axios";

const url1 = "https://widget.inisign.com/Widget/Customers/Customer.aspx?token=6e5cc038-e918-4f97-9a59-d2afa0456abf&scaleToFit=true"
const url2 = "https://widget.inisign.com/Widget/Customers/Customer.aspx?token=a8923cdb-9d92-46bc-b6a4-d026c2cf9a89&scaleToFit=true"
const url3 = "https://widget.inisign.com/Widget/Customers/Customer.aspx?token=756a5aa2-a95f-4d15-ad5a-59829741075b&scaleToFit=true"

interface CustomURLProps {
  url: string;
  }

const ExternalBodyContent = ({ url }: CustomURLProps) => {
  const [bodyContent, setBodyContent] = useState(null);

  useEffect(() => {
    const fetchHtmlContent = async () => {
      try {
        const response = await axios.get(url);
        const bodyStartIndex = response.data.indexOf("<body");
        const bodyEndIndex = response.data.indexOf("</body>") + "</body>".length;
        const bodyHTML = response.data.substring(bodyStartIndex, bodyEndIndex);
        setBodyContent(bodyHTML);
      } catch (error) {
        console.error("Error fetching HTML content:", error);
      }
    };

    fetchHtmlContent();
  }, [url]);

  return <div dangerouslySetInnerHTML={{ __html: bodyContent || "Loading..."  }} />;
};
  

const LandingPage = () => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>
      <ExternalBodyContent url= {url1} />
      <ExternalBodyContent url= {url2} />
      <ExternalBodyContent url= {url3} />
    </div>
  );
};

export default LandingPage;