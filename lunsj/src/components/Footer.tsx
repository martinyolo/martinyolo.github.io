import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer style={footerStyle}>
            <p>
            Menyen er hentet fra:  
                <a href="https://widget.inisign.com/Widget/Customers/Customer.aspx?token=c5a641de-e74e-48eb-be4e-d847f261ec11" target="_blank" rel="noopener noreferrer">
                     https://widget.inisign.com/Widget/Customers/Customer.aspx?token=c5a641de-e74e-48eb-be4e-d847f261ec11
                </a>
            </p>
        </footer>
    );
};

const footerStyle: React.CSSProperties = {
    backgroundColor: '#f1f1f1',
    padding: '20px',
    textAlign: 'center',
};

export default Footer;
