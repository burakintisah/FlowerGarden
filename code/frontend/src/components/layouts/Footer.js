import React from 'react'
import styled from 'styled-components'

function Footer() {
    return (
        <FooterContainer className="main-footer">
            <div className="footer-middle">
                <div className="container">
                    <div className="row">
                        {/*Column 1 */}
                        <div className="col-md-3 col-sm-6">
                            <h4> Lorem Ipsum</h4>
                            <ul className="list-unstyled">
                                <li><a href="/">Lorem ipsum</a></li>
                                <li><a href="/">Lorem ipsum</a></li>
                                <li><a href="/">Lorem ipsum</a></li>
                                <li><a href="/">Lorem ipsum</a></li>
                            </ul>
                        </div>
                        {/*Column 2 */}
                        <div className="col-md-3 col-sm-6">
                            <h4> Lorem Ipsum</h4>
                            <ul className="list-unstyled">
                                <li><a href="/">Lorem ipsum</a></li>
                                <li><a href="/">Lorem ipsum</a></li>
                                <li><a href="/">Lorem ipsum</a></li>
                                <li><a href="/">Lorem ipsum</a></li>
                            </ul>
                        </div>
                        {/*Column 3 */}
                        <div className="col-md-3 col-sm-6">
                            <h4> Lorem Ipsum</h4>
                            <ul className="list-unstyled">
                                <li><a href="/">Lorem ipsum</a></li>
                                <li><a href="/">Lorem ipsum</a></li>
                                <li><a href="/">Lorem ipsum</a></li>
                                <li><a href="/">Lorem ipsum</a></li>
                            </ul>
                        </div>
                        {/*Column 4 */}
                        <div className="col-md-3 col-sm-6">
                            <h4> Lorem Ipsum</h4>
                            <ul className="list-unstyled">
                                <li><a href="/">Lorem ipsum</a></li>
                                <li><a href="/">Lorem ipsum</a></li>
                                <li><a href="/">Lorem ipsum</a></li>
                                <li><a href="/">Lorem ipsum</a></li>
                            </ul>
                        </div>

                    </div>
                    {/*Footer Bottom*/}
                    <div className="footer-bottom mt-3">
                        <p className="text-xs-center">
                            &copy;{new Date().getFullYear()} Flower Garden - All Rights Reserved
                        </p>
                    </div>
                </div>
            </div>
        </FooterContainer>


    );
}
export default Footer;

const FooterContainer = styled.footer`
    .footer-middle {
        background: var(--mainDark);
        padding-top: 3rem;
        color: var(--mainWhite)
    }

    .footer-bottom{
        padding-top: 3erm;
        padding-bottom: 2rem;
    }

    ul li a {
        color: var(--mainLightGrey);
    }

    ul li a:hover {
        color: var(--mainBlue);
    }
`;
