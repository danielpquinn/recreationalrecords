import { Handler } from "express";
import { compile } from "handlebars";
import { context } from "../context";

const template = compile(`
<html>
  <head>
    <title>Recreational Records</title>
  </head>
  <body>
    {{#each releases}}
      <div><a href="/releases/{{slug}}"><img src="{{image.url}}" width="150"/> {{title}}</a></div>
    {{/each}}
  </body>
</html>
`);

export const indexHandler: Handler = async (req, res) => {
  const releases = await context.query.Release.findMany({
    take: 500,
    orderBy: [{ publishedDate: "desc" }],
    query: "title slug image { url }",
  });
  res.send(template({ releases }));
};
