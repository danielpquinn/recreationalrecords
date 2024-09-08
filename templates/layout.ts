import Handlebars from "handlebars";

Handlebars.registerPartial(
  "layout",
  `
<html>

<head>
  <title>Recreational Records | {{title}}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Kufam:ital,wght@0,400..900;1,400..900&display=swap"
    rel="stylesheet" />
  <meta name="description"
    content="Chronic Sinus Infection Land. A catalog of random low-fi musical meanderings created by artists from Montana and beyond. No track is too rough." />
  <link href="/css/style.css" rel="stylesheet" />
</head>

<body>
  <header><a href="/">Recreational Records</a></header>
  <img class="ball-and-plant" src="/images/ball-and-plant.png" />
  {{> @partial-block }}
</body>

</html>
`
);
