import React, { useState } from "react";
import FanDataForm from "../FanDataForm/FanDataForm";
import FuriaLogo from "../../assets/assinatura.png"
import FuriaBackground from "../../assets/furia-background.jpg"
import { Page, Header, MenuButton, LogoContainer, Logo, KnowYourFanButton, MainContent, 
  BackgroundImageContainer, BackgroundImage, ModalOverlay, ModalContent
  } from './HomePage.styles'


const HomePage: React.FC = () => {
    const [showForm, setShowForm] = useState(false);

    const handleKnowYourFan = () => setShowForm(true);
    const handleCloseForm = () => setShowForm(false);

    return (
        <Page>

            <Header>
                <MenuButton>
                    <span />
                    <span />
                    <span />
                </MenuButton>
                <LogoContainer>
                    <Logo src={FuriaLogo} alt="FURIA Logo" />
                </LogoContainer>
                <KnowYourFanButton onClick={handleKnowYourFan}>
                    Know Your Fan
                </KnowYourFanButton>
            </Header>

            <MainContent>
                <BackgroundImageContainer>
                    <BackgroundImage src={FuriaBackground} alt="Background" />
                </BackgroundImageContainer>
            </MainContent>

            {showForm && (
                <ModalOverlay>
                    <ModalContent>
                        <FanDataForm onClose={handleCloseForm} />
                    </ModalContent>
                </ModalOverlay>
            )}
        </Page>
    );
};

export default HomePage;