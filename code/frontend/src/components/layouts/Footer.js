import React from 'react'
import styled from 'styled-components'

function Footer() {

    return (
        <FooterContainer className="main-footer">
            <div className="footer-middle">
                <div className="container">
                
                    {/*Footer Bottom*/}
                    <div className="footer-bottom mt-3">
                        <span className="text-xs-center">
                           Copyright &copy;{new Date().getFullYear()} Flower Garden. All Rights Reserved
                        </span>
                    </div>
                </div>
            </div>
        </FooterContainer>


    );
}
export default Footer;

const FooterContainer = styled.footer`
    .footer-middle {
        background: var(--mainWhite);
        color: var(--mainDark)
    }

    .footer-bottom{
        padding-top: 3rem;
        padding-bottom: 2rem;
        font-weight: bold;
    }

    ul li a {
        color: var(--mainLightGrey);
    }

    ul li a:hover {
        color: var(--mainBlue);
    }
`;
