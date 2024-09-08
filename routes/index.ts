import { Handler } from "express";
import { compile } from "handlebars";
import { context } from "../context";
import { formatPublishedDate } from "../utils/utils";

const template = compile(`
{{#> layout title="Releases"}}
<div class="release-count">
  Releases 
  <span class="badge">{{releases.length}}</span>
</div>
<div class="release-items">
  {{#each releases}}
  <a href="/releases/{{slug}}" class="release-item">
    <img class="release-item-image" src="{{image.url}}" width="150" />
    <div class="release-item-info">
      <div class="release-item-info-top">
        <div class="release-item-title">
          <strong>{{title}}</strong>
        </div>
        <div class="release-item-artist">{{artist.name}}</div>
      </div>
      <div class="release-item-meta">
        <div>{{publishedDateFormatted}}</div>
        <div>{{trackCount}}</div>
      </div>
    </div>
  </a>
  {{/each}}
</div>
{{/layout}}
`);

export const indexHandler: Handler = async (req, res) => {
  const releases = await context.query.Release.findMany({
    take: 500,
    orderBy: [{ publishedDate: "desc" }],
    query: "title slug image { url } publishedDate tracks { title } artist { name }",
  });
  for (const release of releases) {
    release.publishedDateFormatted = formatPublishedDate(release.publishedDate);
    release.trackCount = `${release.tracks.length} track${release.tracks.length > 1 ? "s" : ""}` 
  }
  res.send(template({ releases }));
};
