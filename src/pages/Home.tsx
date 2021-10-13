import {IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar} from '@ionic/react';
import Image from '../components/Image';
import './Home.css';
import React from "react";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
          <img src="assets/images/topbarlogo.jpg" id="headerimg"></img>
          <IonGrid>
            <IonRow>
                <IonCol>
                    <Image
                        imagePath="assets/images/allerecepten.jpg"
                        description="Alle Recepten">
                    </Image>
                </IonCol>
                <IonCol>
                    <Image
                        imagePath="assets/images/uwaccount.jpg"
                        description="Uw Account">
                    </Image>
                </IonCol>
            </IonRow>
              <IonRow>
                  <IonCol>
                      <Image
                          imagePath="assets/images/voegrecepttoe.jpg"
                          description="Voeg Recept Toe">
                      </Image>
                  </IonCol>
                  <IonCol>
                      <Image
                          imagePath="assets/images/favorieterecepten.jpg"
                          description="Favoriete Recepten">
                      </Image>
                  </IonCol>
              </IonRow>
              <IonRow>
                  <IonCol>
                      <Image
                          imagePath="assets/images/zoekrecepten.jpg"
                          description="Zoek Recepten">
                      </Image>
                  </IonCol>
              </IonRow>
          </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
