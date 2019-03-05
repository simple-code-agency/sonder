module.exports = ({ root, err }) => `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${err.message}</title>
  </head>
  <body>
    <div style="position: fixed; box-sizing: border-box; inset: 0px; width: 100vw; height: 100vh; background-color: rgba(0, 0, 0, 0.85); color: rgb(232, 232, 232); font-family: Menlo, Consolas, monospace; font-size: large; padding: 2rem; line-height: 1.2; white-space: pre-wrap; overflow: auto;">
    <span style="color: #E36049">[${err.name}] ${err.message} </span>
    
    <span>in ${root}</span>
    </div>
  </body>
</html>
`;
