Containers are basically stateful Components, that's why we have two different folders (components and containers).

We need to install prop-types (npm install --save prop-types) and use it to ensure our props.type in BurgerIngredient.js really gets added so ingredient isn't null. Prop-types is an utility provided by the React team for validating props.

To output our burger ingredients dynamically we have two options. In our BurgerBuilder we can use the constructor function like this,

constructor(props) {
    super(props);
    this.state = { ... }
}

Or use the state in BurgerBuilder (that we have access to because BurgerBuilder is a stateful component)

state = {
    ...
}

BuildControl contains a single BuildControl, e.g. a label and buttons for adding and removing burger ingredients, while BuildControls contain an array of such BuildControls that we'll output. 

The Modal component is basically a wrapping element which provides the styling which then simply wraps itself about any content we want to show in that modal (Author note: seems to be very similar to a higher order component, HOC. The difference is that our HOC, the Auxiliary component, simply outputs it's children elements WITHOUT wrapping anything while our Modal wraps around it's children).