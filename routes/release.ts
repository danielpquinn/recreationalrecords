import { Handler } from "express";
import { compile } from "handlebars";
import { context } from "../context";

const template = compile(`
<html>
  <head>
    <title>Recreational Records | {{title}}</title>
  </head>
  <body>
    <div>
      <img src="{{image.url}}" width="300" />
      <h1>{{title}}</h1>
      <h4>{{{description}}}</h4>
      {{#each tracks}}
        <div
          style="display: flex; align-items: center; margin-bottom: 10px;"
        ><span
            style="display: inline-block; width: 300px;"
          >{{title}}</span><audio controls src="{{mp3.url}}" /></div>
      {{/each}}
    </div>
  </body>
</html>
`);

export const releaseHandler: Handler = async (req, res) => {
  const releases = await context.query.Release.findMany({
    where: {
      slug: { equals: req.params.slug },
    },
    query: "title description image { url } tracks { id, title, mp3 { url } }",
  });
  const release = releases[0];

  if (!releases[0]) {
    res.statusCode = 404;
    res.send("Not found");
    return;
  }

  res.send(template(release));
};
