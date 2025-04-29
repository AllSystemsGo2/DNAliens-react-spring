# Commands 

## Deploy
```
npm run deploy
```
Will deploy to https://allsystemsgo2.github.io/DNAliens-react-spring/



# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Convienence Commands

## Generate New Page
```
create a new View 'Level1/Level1_003IntroCellina' include useNavigate from react-router-dom, {useString, animated} from react-spring/web, {useSelector, useDispatch} from react-redux, and {useTranslation} from react-i18next.

In the react viewcomponent function, create constants dispatch, t, and navigate to recieve useDispatch(), useTranslation(), and useNavigate().

Also import character components: Lop and Player.
 
Import pageSlice and configure an empty defaultState. Then add a useEffect to dispatch initializePageAttributes for the defaultState and useSelector to retrieve the selectPageAttributes in the pattern shown in Level1_001Frisbee

The container div must include the style selector "view".

Add a Scene component with the following props:
- skyImage: starryBackground
- terrainImage: planetForeground
- transformTerrain: scaleX(1) 

Add a Player component with the following props:
- left: 5vw
- bottom: 5vh
- zIndex: 2
- state: idle

Add a Lop component with the following props:
- left: 15vw
- bottom: 12vh
- zIndex: 2
- state: idle
```
