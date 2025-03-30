import worksIcon from '/person-digging-solid.png';
import '../styles/ConstructionPage/ConstructionPage.css';

export function ConstructionPage() {
  return (
    <div id="construction-page-container">
      <h1>Page en construction 🚧</h1>
      <div className="image-container">
        <img src={worksIcon} alt="plot de chantier" />
      </div>

      <p>
        Cette section de l{"'"}application est actuellement en cours de
        développement et sera disponible pour la version 2.
      </p>
    </div>
  );
}
