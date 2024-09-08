import { Handler } from "express";
import { compile } from "handlebars";
import { context } from "../context";
import { formatPublishedDate } from "../utils/utils";

const template = compile(`
{{#> layout title=title}}
<script src="/js/player.js"></script>
<div class="release-breadcrumb">
  <a href="/">< Back</a>
</div>
<div class="release-container">
  <div class="release">
    <img src="{{image.url}}" class="release-image" />
    <div class="release-content">
      <h1 class="release-title">{{title}}</h1>
      <h4 class="release-artist">{{artist.name}}</h4>
      <p class="release-meta">{{publishedDateFormatted}} | {{trackCount}}</p>
      {{#each genres}}
        <span class="badge">{{name}}</span>
      {{/each}}
      {{{description}}}
      {{#each tracks}}
        <div class="track">
          <div class="track-info">
            <span class="track-title">{{title}}</span>
            <br />
            <span class="track-artist">{{artist.name}}</span>
          </div>
          <audio controls src="{{mp3.url}}" />
        </div>
      {{/each}}
    </div>
  </div>
</div>
{{/layout}}
`);

export const releaseHandler: Handler = async (req, res) => {
  const releases = await context.query.Release.findMany({
    where: {
      slug: { equals: req.params.slug },
    },
    query: "title artist { name } publishedDate description image { url } tracks { id title mp3 { url } artist { name } } genres { name }",
  });
  const release = releases[0];

  release.publishedDateFormatted = formatPublishedDate(release.publishedDate);
  release.trackCount = `${release.tracks.length} track${release.tracks.length > 1 ? "s" : ""}` 

  if (!releases[0]) {
    res.statusCode = 404;
    res.send("Not found");
    return;
  }

  res.send(template(release));
};
