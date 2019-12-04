import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeContext, AuthContext } from '../../contexts';
import Header from '../Header/index';
import VisitorPage from '../VisitorPage';
import TodoPage from '../TodoPage';
import styled from 'styled-components';

const Wrapper = styled.div`
    display : grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    min-height : 100vh;
`;
const FooterLayout = styled.div(({ theme }) => `
    background-color: ${theme.p};
    color : ${theme.onP};
`);


const MainPage = ({ ...props }) => {
    return (
        <ThemeContext.Consumer>
            {value => (
                <AuthContext.Consumer>
                    {user =>
                        (
                            <Router>
                                <Wrapper>
                                    <Header />
                                    <Switch>
                                        <Route path='/' exact component={user?TodoPage:VisitorPage} />
                                    </Switch>
                                    <FooterLayout theme={value}>footer</FooterLayout>
                                </Wrapper>
                            </Router>
                        )
                    }
                </AuthContext.Consumer>
            )}
        </ThemeContext.Consumer>
    )
}

export default MainPage;