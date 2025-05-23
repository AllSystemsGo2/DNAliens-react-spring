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
create a new View 'Level1/Level1_003IntroCellina' include {useNavigate, useLocation} from react-router-dom, {useString, animated} from react-spring/web, {useSelector, useDispatch} from react-redux, and {useTranslation} from react-i18next.

In the react viewcomponent function, create constants dispatch, t, navigate, and location to recieve useDispatch(), useTranslation(), useNavigate(), and useLocation().

Import setBubbleShow from Bubble Helper.
Import navigateTo from appSlice.
Import setPageAttribute from pageSlice.

Also import character components: Lop, Player, and Cellina
Import SpeechBubble and MultipleChoicePrompt components. 

 Configure an empty object named 'defaultState'. Then add a useEffect to dispatch initializePageAttributes for the defaultState with dependencies for [dispatch, location.pathname]. Use useSelector to retrieve the selectPageAttributes in the pattern shown in Level1_001Frisbee. 

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

Add a Cellina component with the following props:
- left: 25vw
- bottom: 12vh
- zIndex: 2
- state: idle
```



# Components

## Draggable & DropArea
Draggable component features:
- Tracks mouse movement for dragging
- Returns to original position if not dropped on valid area
- Calls tryDropOn when dropped on a DropArea
- Maintains its dropArea ID
- Supports custom styling

DropArea component features:
- Tracks when new Draggable children are added
- Fires onDrop event with draggable ID when new draggable is mounted
- Supports custom styling
- Maintains unique area ID for identification

To use these components, you would do something like this:
```jsx
<DropArea id="area1" onDrop={(draggableId) => console.log(`${draggableId} was dropped!`)}>
  {/* Dropped items will appear here */}
</DropArea>

<Draggable 
  id="drag1" 
  dropArea="area1"
  tryDropOn={(areaId) => areaId === 'area1'}
>
  <YourContent />
</Draggable>
```
