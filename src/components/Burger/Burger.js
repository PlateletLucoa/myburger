import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    // transformedIngredients works as follows
    // 1. Object.keys(props.ingredients) creates an array containing our keys in the ingredients object in our BurgerBuilder state, so ["salad", "bacon", "cheese", "meat"]

    // 2. After that we create an another array based on the ingredients name in our array created from Object.keys (["salad", "bacon", "cheese", "meat"]). Inside this newly created array we'll add empty arrays with the slots based on the value our ingredients are linked to. At the point of writing we have a state looking like this,

    // state = {
    //     ingredients: {
    //         salad: 1,
    //         bacon: 1,
    //         cheese: 2,
    //         meat: 2
    //     }
    // }

    // So where "salad" was we would create an empty array with 1 slot. "bacon" also gets 1 array with 1 slot but both "cheese" and "meat" each gets 1 array with 2 slots. So the end result after .map(igKey => { return [...Array(props.ingredients[igKey])] }) looks like this,

    // [ [undefined], [undefined], [undefined, undefined], [undefined, undefined ]

    // Note: Array(n) will create an array with n slots if the provided n is an integer. We use the spread operator to insert undefined values into the empty slots (not confirmed but likely).

    // 3. Inside this array containing arrays with empty slots we now want to populate the slots with BurgerIngredient components based on the key specified in our state. We do this by using yet another .map where we first input underscore, '_', to indicate that we don't care about the element that's going to be inserted but our index is important so we input 'i' directly afterwards. Hence .map((_, i) => ...) 

    // Since we're going to return an array of JSX elements we need to specify a key. Our key here is very simple, it's igKey which is something like "salad", "bacon", and i is simply a number 0, 1, 2, and so on. The type we insert here is simply igKey so the correct BurgerIngredient is generated.

    // With all this we should know have an array containing arrays filled with BurgerIngredients. To summarize, 
        
        // First we create an array with our keys, ["salad", "bacon", "cheese", "meat"].

        // Then we go through every element in this array and create a new array with slots based on our key value from the state, e.g. "salad" will create an array with 1 empty slot while "meat" will create an array with 2 empty slots. At this point in time we have: [[undefined], [undefined], [undefined, undefined], [undefined, undefined]]

        // Lastly for this newly created array we'll go through every slot it has and populate it with BurgerIngredients based on the ingredient's name. End result: [[<BurgerIngredient type={salad} />], [<BurgerIngredient type={bacon}/>], ...]

    // const transformedIngredients = Object.keys(props.ingredients)
    //     .map(igKey => {
    //         return [...Array(props.ingredients[igKey])].map((_, i) => {
    //             return <BurgerIngredient key={igKey + i} type={igKey} />
    //         });
    //     });

    // The reduce method takes a callback function with two values passed in automatically by JavaScript, the previous value and the current value. The callback function is called for every element in our array. It can also accept an initial value. Final result looks something like this, Array.reduce((previousVal, currentVal) => {...}, initialVal). The reduce method outputs a single output value.

    // In our case, we want to start with an initial value of [] (empty array). We then use Array.concat() to merge our arrays into a single one. If all the keys in our state ingredient object have a value of 0 we should end up with a single empty array after reducing. The 'arr' argument will always be the updated root array which we want to return in the end. 
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />
            });
        }).reduce((arr, el) => {
            return arr.concat(el);
        }, []);

    // Now that we've reduced our previous array into a single one we now know it's empty when the array length is 0. Previously the length would be 4 regardless of how many BurgerIngredients we had because there would always be 4 arrays inside.
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }
       
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;