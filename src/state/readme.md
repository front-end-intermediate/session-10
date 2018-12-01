# Notes

## Local State in React

```js
import React from 'react';

class App extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          counter: 0
      };
  }

  render(){
      return (
          <div>
              <p>{this.state.counter}</p>
          </div>
          )
      }
  }

export default App;
```

You are never allowed to alter the state directly: `this.state.counter = 1`. That would be a direct mutation. Instead, you have to use the React component API to change the state explicitly by using the `this.setState()` method.

```js
import React from 'react';

class App extends React.Component {

  constructor(props) {
      super(props);
      this.onIncrement = this.onIncrement.bind(this);
      this.onDecrement = this.onDecrement.bind(this);
      this.state = {
          counter: 0
      };
  }

  onIncrement() {
      this.setState({
          counter: this.state.counter + 1
      });
  }

  onDecrement() {
      this.setState({
          counter: this.state.counter - 1
      });
  }

  render(){
      return (
          <div>
          <p>{this.state.counter}</p>
          </div>
          )
      }
  }

export default App;
```

The class methods can be used in the `render()` method to trigger the local state changes. Add buttons.

```js
import React from 'react';

class App extends React.Component {

  constructor(props) {
      super(props);
      this.onIncrement = this.onIncrement.bind(this);
      this.onDecrement = this.onDecrement.bind(this);
      this.state = {
          counter: 0
      };
  }

  onIncrement() {
      this.setState({
          counter: this.state.counter + 1
      });
  }
  
  onDecrement() {
      this.setState({
          counter: this.state.counter - 1
      });
  }

  render(){
      return (
          <div>
          <p>{this.state.counter}</p>

          <button type="button" onClick={this.onIncrement}>Increment</button>
          <button type="button" onClick={this.onDecrement}>Decrement</button>

          </div>
          )
      }

  }

export default App;
```

he button `onClick` handler should invoke the class methods to alter the state by either incrementing or decrementing the counter value. Then, the update functionality with `this.setState()` is performing a **shallow merge** of objects.

What does a shallow merge mean? Imagine you had the following state in your component, two arrays with objects:

```js
this.state = {
  authors: [...],
  articles: [...],
};
```

When updating the state only partly, for instance the authors, the other part, in this case the articles, are left intact.

```js
this.setState({
  authors: [
    { name: 'Robin', id: '1' }
  ]
});
```

It only updates the `authors` array with a new array without touching the `articles` array. That's called a shallow merge. It simplifies the local state management for you so that you don't have to keep an eye on all properties at once in the local state.

## Stateful and Stateless Components

Local state can only be used in React ES6 class components. The component becomes a **stateful component** when state is used. Otherwise, it can be called **stateless component** even though it is still a React ES6 class component. This can be the case if you still need to use React's lifecycle methods.

On the other hand, **functional stateless components** have no state, because, as the name implies, they are only functions and thus, they are stateless. They get input as props and return output as JSX. In a stateless component, state can only be passed as props from a parent component. However, the functional stateless component is unaware of the props being state in the parent component. In addition, callback functions can be passed down to the functional stateless component to have an indirect way of altering the state in the parent component again. A functional stateless component for the Counter example could look like the following:

```js
import React from 'react';

function CounterPresenter(props) {
  return (
    <div>
      <p>{props.counter}</p>
      <button type="button" onClick={props.onIncrement}>
        Increment
      </button>
      <button type="button" onClick={props.onDecrement}>
        Decrement
      </button>
    </div>
  );
}

export default CounterPresenter;
```

Now only the props from the parent component would be used in this functional stateless component. The `counter` prop would be displayed and the two callback functions, `onIncrement()` and `onDecrement()` would be used for the buttons. However, the functional stateless component is not aware whether the passed properties are state, props or some other derived properties. The origin of the props doesn't need to be in the parent component after all, it could be somewhere higher up the component tree. The parent component would only pass the properties or derived properties along the way. In addition, the component is unaware of what the callback functions are doing. It doesn't know that these alter the local state of the parent component.

After all, the callback functions in the stateless component would make it possible to alter the state somewhere above in one of the parent components. Once the state was manipulated, the new state flows down as props into the child component again. The new `counter` prop would be displayed correctly, because the render method of the child component runs again with the incoming changed props.

The example shows how local state can traverse down from one component to the component tree. To make the example with the functional stateless component complete, let's quickly show what a potential parent component, that manages the local state, would look like. It is a React ES6 class component in order to be stateful.

```js
import React from 'react';
import CounterPresenter from './CounterPresenter'

class CounterContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0
    };

    this.onIncrement = this.onIncrement.bind(this);
    this.onDecrement = this.onDecrement.bind(this);
  }

  onIncrement() {
    this.setState({
      counter: this.state.counter + 1
    });
  }

  onDecrement() {
    this.setState({
      counter: this.state.counter - 1
    });
  }

  render() {
    return <CounterPresenter
      counter={this.state.counter}
      onIncrement={this.onIncrement}
      onDecrement={this.onDecrement}
    />
  }
}

export default CounterContainer;
```

It is not by accident that the suffixes in the naming of both `Counter` components are `Container` and `Presenter`. It is called the [container and presentational component pattern](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0). It is most often applied in React, but could live in other component centred libraries and frameworks, too. If you have never heard about it, I recommend reading the referenced article. It is a widely used pattern, where the container component deals with "How things work" and the presenter component deals with "How things look". In this case, the container component cares about the state while the presenter component only displays the counter value and provides a handful of click handlers without knowing that these click handlers manipulate the state.

Container components are the ideal candidates to manage state while the presenter components only display it and act on callback functions.

## Props vs. State

There is a difference between state and props in React. When properties are passed to a child component, whether it is state, props or derived properties, the child component isn't aware of the kind of properties. It sees the incoming properties as props. That's perfect, because the component shouldn't care at all about the kind of properties. It should only make use of them as simple props.

The props come from a parent component. In the parent component these props can be state, props or derived properties. It depends on the parent component, if it manages the properties itself (state), if it gets the properties from a parent component itself (props) or if it derives new properties from the incoming props coming from its parent component along the way (derived properties).

After all, you can't modify props. Props are only properties passed from a parent component to a child component. On the other hand, the local state lives in the component itself. You can access it by using `this.state`, modify it by using `this.setState()`, and pass it down as props to child components.

When one of these objects changes, whether it is the props that come from the parent component or the state in the component, the update lifecycle methods of the component will run. One of these lifecycle methods is the `render()` method that updates your component instance based on the props and state. The correct values will be used and displayed after the update ran in your component.

The [official React documentation](https://reactjs.org/docs/thinking-in-react.html) identifies state and props:

* Are the properties passed from the parent component? If yes, the likelihood is high that they aren't state. Though it is possible to save props as state, there are few use cases. Saving props as state should be avoided.

* Are the properties unchanged over time? If yes, they don't need to be stateful, because they don't get modified.

* Are the properties derivable from local state or props? If yes, you don't need them as state, because you can derive them. If you allocated extra state, the state has to be managed and can get out of sync when you miss deriving the new properties at some point.

## Form State

There are two ways to use forms in React. You can use the ref attribute or local state. It is recommended to use the local state approach, because the ref attribute is reserved for only a few use cases.

<!-- [When to use Ref on a DOM node in React](https://www.robinwieruch.de/react-ref-attribute-dom-node/). -->

The following code snippet is a quick demonstration showing how form state can be used by using the ref attribute. Afterward, the code snippet will get refactored to use the local state which is the best practice anyway.

```js
import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    const { value } = this.input;

    // do something with the search value
    // e.g. propagate it up to the parent component
    this.props.onSearch(value);

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          ref={node => this.input = node}
          type="text"
        />
        <button type="submit">
          Search
        </button>
      </form>
    );
  }
}
```

The value from the input node is retrieved by using the reference to the DOM node. It happens in the `onSubmit()` method. The reference is created by using the ref attribute in the `render()` method.

Now let's see how to make use of local state to embrace best practices rather than using the reserved ref attribute.

```js
import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    const { value } = event.target;

    this.setState({
      query: value
    });
  }

  onSubmit(event) {
    const { query } = this.state;

    // do something with the search value
    // e.g. propagate it up to the parent component
    this.props.onSearch(query);

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          onChange={this.onChange}
          type="text"
        />
        <button type="submit">
          Search
        </button>
      </form>
    );
  }
}
```

You don't need to make use of the ref attribute anymore. You can solve the problem by using local state only. The example demonstrates it with only one input field yet it can be used with multiple input fields, too. You would only need to allocate more properties, one for each input field, in the local state.

## Controlled Components

The previous example of using form state with local state has one flaw. It doesn't make use of **controlled components**. Naturally, a HTML input field holds its own state. When you enter a value into the input field, the DOM node knows about the value. That's the native behavior of HTML elements, otherwise they wouldn't work on their own.

However, the value lives in your local state, too. You have it in both, the native DOM node state and local state. But you want to make use of a single source of truth. It is a best practice to overwrite the native DOM node state by using the `value` attribute on the HTML element and the value from the local state from the React component.

Let's consider the previous example again. The input field had no value attribute assigned. By using the native value attribute and passing the local state as value, you convert an uncontrolled component to a controlled component.

```js
import React from 'react';

class Search extends React.Component {

  ...

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input

          value={this.state.query}

          onChange={this.onChange}
          type="text"
        />
        <button type="submit">
          Search
        </button>
      </form>
    );
  }
}
```

Now the value comes from the local state as single source of truth. It cannot get out of sync with the native DOM node state. This way, you can provide an initial state for the DOM node state too. Otherwise, try to have an initial local state for the `query` in your local state, but don't provide the `value` attribute to the input field. Your state would be out of sync in the beginning, because the input field would be empty even though the local state of the React component says something else.

## Unidirectional Data Flow

In the previous example, you experienced a typical unidirectional data flow. The Flux architecture, the underlying architecture for several sophisticated state management solutions such as Redux, coined the term **unidirectional data flow**. You will get to know more about the Flux architecture in a later chapter. But the essence of an unidirectional data flow is embraced by local state in React, too. State in React flows only in one direction. State gets updated by using `this.setState()` and is displayed due to the `render()` lifecycle method by accessing `this.state`. Then again, it can be updated via `this.setState()` and a component re-renders.

The previous example, where you have used controlled components, shows the perfect loop of the unidirectional data flow. The input field triggers the `onChange` handler when the input changes. The handler alters the local state. The changed local state triggers an update lifecycle of the component. The update lifecycle runs the `render()` lifecycle method again. The `render()` method makes use of the updated state. The state flows back to the input field to make it a controlled component. The loop is closed. A new loop can be triggered by typing something into the input field again.

The unidirectional data flow makes state management predictable and maintainable. The best practice already spread to other state libraries, view layer libraries and SPA solutions. In the previous generation of SPAs, most often other mechanics were used. For instance, in Angular 1.x you would have used two-way data binding in a model-view-controller (MVC) architecture. That means, once you changed the value in the view, let's say in an input field by typing something, the value got changed in the controller. But it worked vice versa, too. Once you had changed the value in the controller programmatically, the view, to be more specific the input field, displayed the new value. You might wonder: What's the problem with this approach? Why is everybody using unidirectional data flow instead of bidirectional data flow now?

### Unidirectional vs. Bidirectional Data Flow

React embraces unidirectional data flow. In the past, frameworks like Angular 1.x embraced bidirectional data flow. It was known as two-way data binding. It was one of the reasons that made Angular popular in the first place. But it failed in this particular area, and this led a lot of people to switch to React. So why did the bidirectional data flow fail? Why is everyone adopting the unidirectional data flow?

The three advantages in unidirectional data flow over bidirectional data flow are predictability, maintainability and performance.

**Predictability**: In a scalable application, state management needs to stay predictable. When you alter your state, it should be clear which components care about it. It should also be clear who alters the state in the first place. In an unidirectional data flow one stakeholder alters the state, the state gets stored, and the state flows down from one place, for instance a stateful component, to all child components that are interested in the state.

**Maintainability:** When collaborating with a team on a scalable application, one requirement of state management is predictability. Humans are not capable to keep track of a growing bidirectional data flow. That's why the state management stays more maintainable when it is predictable. Otherwise, when people cannot reason about the state, they introduce inefficient state handling. But maintainability doesn't come without any cost in a unidirectional data flow. Even though the state is predictable, it often needs to be refactored thoughtfully - by lifting state or using higher-order components for local state.

**Performance:** In a unidirectional data flow, the state flows down the component tree. All components that depend on the state have the chance to re-render. Contrary to a bidirectional data flow, it is not always clear who has to update according to state changes. The state flows in too many directions. The model layer depends on the view layer and the view layer depends on the model layer. It's a vice versa dependency that leads to performance issues in the update lifecycle.

These three advantages show the benefits of using a unidirectional data flow over an bidirectional data flow. That's why so many state management and SPA solutions thrive for the former one nowadays.

<!-- missing -->

## Functional State

We used `this.setState()` to alter the local state. However, there is a flaw in using `this.setState()` the way we did in the last chapters for certain use cases: It is important to know that `this.setState()` is executed asynchronously to update the local state. React batches all the state updates, because it executes them after each other for performance optimizations. Thus, the `this.setState()` method comes in two versions.

In its first version, the `this.setState()` method takes an object to update the state. The merging of the object is a shallow merge. For instance, when updating `authors` in a state object of `authors` and `articles`, the `articles` stay intact. The previous examples have already used this approach:

```js
this.setState({
  ...
});
```

In its second version, the `this.setState()` method takes a function as argument. The function has the previous state and props in the function signature to be used for the state update.

```js
this.setState((prevState, props) => ({
  ...
}));
```

So, what's the flaw in using `this.setState()` with an object? In the component, the state was updated based on the previous state or props. However, `this.setState()` executes asynchronously. Thus the state or props that are used to perform the update could be stale at this point in time, because the state was updated more than once in between. It could lead to bugs in your local state management, because you would update the state based on stale properties. When using the functional approach to update the local state, the state and props are used when `this.setState()` performs asynchronously at the time of its execution.

```js
import React from 'react';
import CounterPresenter from './CounterPresenter'

class CounterContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0
    };

    this.onIncrement = this.onIncrement.bind(this);
    this.onDecrement = this.onDecrement.bind(this);
  }

  onIncrement() {
    this.setState({
      counter: this.state.counter + 1
    });
  }

  onDecrement() {
    this.setState({
      counter: this.state.counter - 1
    });
  }

  render() {
    return <CounterPresenter
      counter={this.state.counter}
      onIncrement={this.onIncrement}
      onDecrement={this.onDecrement}
    />
  }
}

export default CounterContainer;
```

Executing one of the class methods, `onIncrement()` or `onDecrement()`, multiple times could lead to a bug. Because both methods depend on the previous state, it could use a stale state when the asynchronous update wasn't executed in between and the method got invoked another time.

```js
this.setState({ counter: this.state.counter + 1 }); // this.state: { counter: 0 }
this.setState({ counter: this.state.counter + 1 }); // this.state: { counter: 0 }
this.setState({ counter: this.state.counter + 1 }); // this.state: { counter: 0 }
// updated state: { counter: 1 }
// instead of: { counter: 3 }
```

It becomes even more error prone when multiple functions, such as `onIncrement()` and `onDecrement()`, that use `this.setState()` depend on the previous state. You can refactor the example to use the functional state updating approach:

```js
class CounterContainer extends React.Component {
  constructor(props) {
    ...
  }

// start-insert
  onIncrement() {
    this.setState(prevState => ({
      counter: prevState.counter + 1
    }));
  }

  onDecrement() {
    this.setState(prevState => ({
      counter: prevState.counter - 1
    }));
  }
// end-insert

  render() {
    ...
  }
}
```

The functional approach opens up two more benefits. First, the function which is used in `this.setState()` is a pure function. There are no side-effects. The function always will return the same output (next state) when given the same input (previous state). It makes it predictable and uses the benefits of functional programming. Second, since the function is pure, it can be tested easily in an unit test and independently from the component. It gives you the opportunity to test your local state updates as business logic which is separated from the view layer. You only have to extract the function from the component.

```js
import React from 'react';

// start-insert
const incrementUpdate = prevState => ({
  counter: prevState.counter + 1
});

const decrementUpdate = prevState => ({
  counter: prevState.counter - 1
});
// end-insert

class CounterContainer extends React.Component {
  constructor(props) {
    ...
  }

// start-insert
  onIncrement() {
    this.setState(incrementUpdate);
  }

  onDecrement() {
    this.setState(decrementUpdate);
  }
// end-insert

  render() {
    ...
  }
}
```

Now, you could test the pure functions as business logic separately from the view layer. When to use the object and when to use the function in `this.setState()`? The recommended rules of thumb are:

* Always use `this.setState()` with a function when you depend on previous state or props.
* Only use `this.setState()` with an object when you don't depend on previous properties.
* In case of uncertainty, use `this.setState()` with a function.

## React's Context for Provider and Consumer

The context API is a powerful feature in React. You will not often see it when using plain React, but might consider using it when your React application grows in size and depth from a component perspective. Basically, React's context API takes the clutter away of passing mandatory props, that are needed by every component, down your whole component tree. Most often components in between are not interested in these props.

But you will not only see it when using plain React. Often React's context API can be seen in action when using an external state management library such as Redux or MobX. There, you often end up with a `Provider` component at the top of your component hierarchy that bridges your state layer (Redux/MobX/...) to your view layer (React). The `Provider` component receives the state as props and afterward, each child component has implicitly access to the managed state by Redux and MobX.

Do you remember the last time when you had to pass props several components down your component tree? In plain React, you can be confronted often with this issue which is called "prop drilling". It can happen that a couple of these props are even mandatory for each child component. Thus you would need to pass the props down to each child component. In return, this would clutter every component in between which has to pass down these props without using them oneself.

When these props become mandatory, React's context API gives you a way out of this mess. Instead of passing down the props explicitly down to each component, you can hide props, that are necessary for each component, in React's context and pass them implicitly down to each component. React's context traverses invisible down the component tree. If a component needs access to the context, it can consume it on demand.

What are use cases for this approach? For instance, your application could have a configurable colored theme. Each component should be colored depending on the configuration. The configuration is fetched once from your server, but afterward you want to make this implicitly accessible for all components. Therefore you could use React's context API to give every component access to the colored theme. You would have to provide the colored theme at the top of your component hierarchy and consume it in every component which is located somewhere below it.

How is React's context provided and consumed? Imagine you would have component A as root component that provides the context and component C as one of the child components that consumes the context. Somewhere in between is component D though. The application has a colored theme that can be used to style your components. Your goal is it to make the colored theme available for every component via the React context. In this case, component C should be able to consume it.

First, you have to create the context which gives you access to a Provider and Consumer component. When you create the context with React by using `createContext()`, you can pass it an initial value. In this case, the initial value can be null, because you may have no access to the initial value at this point in time. Otherwise, you can already give it here a proper initial value.

```js
import React from 'react';

const ThemeContext = React.createContext(null);

export default ThemeContext;
```

Second, the A component would have to provide the context. It is a hardcoded `value` in this case, but it can be anything from component state or component props. The context value may change as well when the local state is changed due to a `setState()` call. Component A displays only component D yet makes the context available to all its other components below it. One of the leaf components will be component C that consumes the context eventually.

```js
import ThemeContext from './ThemeContext';

class A extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value={'green'}>
        <D />
      </ThemeContext.Provider>
    );
  }
}
```

Third, in your component C, somewhere below component D, you can consume the context object. Notice that component A doesn’t need to pass down anything via component D in the props so that it reaches component C.

```js
import ThemeContext from './ThemeContext';

class C extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {coloredTheme =>
          <div style={{ color: coloredTheme }}>
            Hello World
          </div>
        }
      </ThemeContext.Consumer>
    );
  }
}
```

The component can derive its style by consuming the context. The Consumer component makes the passed context available by using a [render prop](https://reactjs.org/docs/render-props.html). As you can imagine, following this way every component that needs to be styled accordingly to the colored theme could get the necessary information from React's context API by using the Consumer component now. You only have to use the Provider component which passes the value once somewhere above them and then consume it with the Consumer component. You can read more about [React's context API in the official documentation](https://reactjs.org/docs/context.html).

That’s basically it for React's context API. You have one Provider component that makes properties accessible in React’s context and components that consume the context by using the Consumer component. How does this relate to state management? Basically the pattern, also called provider pattern, is often applied, when using a sophisticated state management solution that makes the state object(s) accessible in your view layer via React's context. Thus the whole state can be accessed in each component. Perhaps you will never implement the provider pattern yourself, but you will most likely use it in a sophisticated state management solution such as Redux or MobX later on. So keep it in mind. Otherwise, React's context can be used to store a state object itself. It can be used when the state is shared globally in your React application, but you don't want to introduce Redux or MobX yet.

## Local Storage in React

```js
import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { hits: null };
  }

  onSearch = (e) => {
    e.preventDefault();

    const { value } = this.input;

    if (value === '') {
      return;
    }

    fetch('https://hn.algolia.com/api/v1/search?query=' + value)
      .then(response => response.json())
      .then(result => this.onSetResult(result));
  }

  onSetResult = (result) => {
    this.setState({ hits: result.hits });
  }

  render() {
    return (
      <div>
        <h1>Search Hacker News</h1>

        <form onSubmit={this.onSearch}>
          <input type="text" ref={node => this.input = node} />
          <button type="submit">Search</button>
        </form>

        {
          this.state.hits &&
          this.state.hits.map(item => <div key={item.objectID}>{item.title}</div>)
        }
      </div>
    );
  }
}

export default App;
```

```js
import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { hits: null };
  }

  onSearch = (e) => {
    e.preventDefault();

    const { value } = this.input;

    if (value === '') {
      return;
    }

    const cachedHits = localStorage.getItem(value);
    if (cachedHits) {
      this.setState({ hits: JSON.parse(cachedHits) });
      return;
    }

    fetch('https://hn.algolia.com/api/v1/search?query=' + value)
      .then(response => response.json())
      .then(result => this.onSetResult(result, value));
  }

  onSetResult = (result, key) => {
    localStorage.setItem(key, JSON.stringify(result.hits));
    this.setState({ hits: result.hits });
  }

  render() {
    return (
      <div>
        <h1>Search Hacker News with Local Storage</h1>
        <p>There shouldn't be a second network request, when you search for something twice.</p>
        <form type="submit" onSubmit={this.onSearch}>
          <input type="text" ref={node => this.input = node} />
          <button type="text">Search</button>
        </form>
        {
          this.state.hits &&
          this.state.hits.map(item => <div key={item.objectID}>{item.title}</div>)
        }
      </div>
    );
  }
}
export default App;
```


