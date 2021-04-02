// import React from "react";
// import RouterContext from "./RouterContext.js";
// import matchPath from "./matchPath.js";

// function evalChildrenDev(children, props, path) {
//   const value = children(props);
//   return value || null;
// }

// class Route extends React.Component {
//   render() {
//     return (
//       <RouterContext.Consumer>
//         {context => {
//           console.log('context', context)
//           const location = this.props.location || context.location;
//           const match = this.props.computedMatch
//             ? this.props.computedMatch // <Switch> already computed the match for us
//             : this.props.path
//               ? matchPath(location.pathname, this.props)
//               : context.match;

//           const props = { ...context, location, match };

//           let { children, component, render } = this.props;

//           if (Array.isArray(children) && children.length === 0) {
//             children = null;
//           }

//           return props.match
//             ? children
//               ? typeof children === "function"
//                 ? __DEV__
//                   ? evalChildrenDev(children, props, this.props.path)
//                   : children(props)
//                 : children
//               : component
//                 ? React.createElement(component, props)
//                 : render
//                   ? render(props)
//                   : null
//             : typeof children === "function"
//               ? __DEV__
//                 ? evalChildrenDev(children, props, this.props.path)
//                 : children(props)
//               : null
//         }}
//       </RouterContext.Consumer>
//     );
//   }
// }

// export default Route;


import React from "react";
import RouterContext from "./RouterContext.js";
import matchPath from "./matchPath.js";


export default (props) => {
  return (
    <RouterContext.Consumer>
      {
        (context) => {
          console.log('route执行结几次')
          const location = context.location;
          const { component } = props;
          const match = matchPath(location.pathname, props);
          const props1 = { ...context, location, match };

          if (props1.match) {
            return React.createElement(component, props1)
          }
          return null;
        }
      }

    </RouterContext.Consumer>
  )
}
