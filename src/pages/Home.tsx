import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import Image from '../components/Image';
import './Home.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Homepage</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Image imagePath="test1"></Image>
        <Image imagePath="test2"></Image>
        <Image imagePath="test3"></Image>
        <ExploreContainer name="Homepage" />
        <ExploreContainer name="tweedes" />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
