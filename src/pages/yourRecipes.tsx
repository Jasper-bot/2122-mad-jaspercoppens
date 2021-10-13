import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './yourRecipes.css';

// React.FC = React.Functional Component
const YourRecipes: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Your recipes</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default YourRecipes;
