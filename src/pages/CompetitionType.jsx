import { BlueCard } from "../components/common/blueCard"
import '../styles/CompetitionType/CompetitionType.css'

export function CompetitionType() {

    const buttonConfig = [
        { 
            buttonText: 'Championnat',
            route: '/ligue',
            style: 'light'
    },
    {
        buttonText: 'Coupe',
        route: '/cup', 
        style: 'light'
    }

]

    return (
        <main className="competition-page">

            <h1>Tournoi Direct 🏆</h1>
            
            <BlueCard 
                cardTitle= 'Choisissez le type de tournoi'
                buttons={buttonConfig}
            />
            <div className="rules-container">
                <div className="rules">
                    <h2>Championnats : </h2>
                    <p>Toutes les équipes s{`'`}affrontent sur des matches aller ou aller-retour</p>
                </div>
                <div className="rules">
                    <h2>Coupe :</h2>
                    <p>Chaque équipe joue des matches à élimination direct avec l{`'`}objectif d{`'`}arriver et gagner la finale</p>
                </div>
            </div>
            
        </main>
    )
}