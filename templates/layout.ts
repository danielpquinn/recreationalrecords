import Handlebars from "handlebars";

Handlebars.registerPartial(
  "layout",
  `
<html>

<head>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-WH7MJH25GG"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-WH7MJH25GG');
  </script>
  <title>Recreational Records | {{title}}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Kufam:ital,wght@0,400..900;1,400..900&display=swap"
    rel="stylesheet" />
  <meta name="description"
    content="Chronic Sinus Infection Land. A catalog of random low-fi musical meanderings created by artists from Montana and beyond. No track is too rough." />
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
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
