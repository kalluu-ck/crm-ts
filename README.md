See my blog post for details: [How to set up a typescript project for Power Apps Web Resources](https://kalcancode.wordpress.com/2025/03/26/how-to-set-up-a-typescript-project-for-power-apps-web-resources/)

# Build
```
npm install
npx webpack
```
This will build typescript code and bundle the javascript into js files and place them in the `dist` folder

# Usage
- Deploy the js files from `dist` folder as web resources in Power Apps
- Define the function name with pattern `[LibraryName].[FunctionName]` (e.g. `Account.accountOnLoad`) in Power Apps handler
