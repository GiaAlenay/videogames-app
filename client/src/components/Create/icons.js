export const genresIcons=(id)=>{
switch (id) {
    case 1:        
        return 'action.png'
    case 2:
        return 'indie.png'
    case 3:
        return 'adventure.png'
    case 4:
        return 'RPG.png'
    case 5:
        return 'strategy.png'
    case 6:
        return'shooter.png'
    case 7:
        return 'casual.png'
    case 8:
        return 'simulation.png'
    case 9:
        return 'puzzle.png'
    case 10:
        return 'arcade.png'
    case 11:
        return 'platformer.png'
    case 12:
        return 'racing.png'
    case 13:
        return 'massivelyMultiplayer.png'
    case 14:
        return 'sports.png'
    case 15:
        return 'fighting.png'
    case 16:
        return 'family.png'
    case 17:
        return 'boardGames.png'
    case 18:
        return 'educational.png'
    case 19:
        return'card.png'
    default:
        console.log('default')
        break;
}}

export const platformsIcons=(index)=>{
switch (index) {
    case 0:        
        return 'pc.png'
    case 1:        
        return 'ps5.png'
    case 2:
        return 'ps4.png'
    case 3:
        return 'ps3.png'
    case 4:
        return 'xboxOne.png'
    case 5:
        return 'xboxSeries.png'
    case 6:
        return'xbox360.png'
    case 7:
        return 'xbox.png'
    case 8:
        return 'nintendoSwitch.png'
    case 9:
        return 'nintendo3s.png'
    case 10:
        return 'nintendods.png'
    case 11:
        return 'nintendoDsi.png'
    case 12:
        return 'ios.png'
    case 13:
        return 'android.png'
    case 14:
        return 'macos.png'
    case 15:
        return 'linux.png'
    default:
        console.log('default')
        break;
}}

export const genressIconByName=(name)=>{
    switch (name) {
        case 'Action':        
            return 1
        case "Indie":
            return 2
        case "Adventure":
            return 3
        case "RPG":
            return 4
        case "Strategy":
            return 5
        case "Shooter":
            return 6
        case "Casual":
            return 7
        case "Simulation":
            return 8
        case "Puzzle":
            return 9
        case "Arcade":
            return 10
        case "Platformer":
            return 11
        case "Racing":
            return 12
        case "Massively Multiplayer":
            return 13
        case "Sports":
            return 14
        case "Fighting":
            return 15
        case "Family":
            return 16
        case "Board Games":
            return 17
        case "Educational":
            return 18
        case "Card":
            return 19
        default:
            console.log('default')
            break;
    }
}