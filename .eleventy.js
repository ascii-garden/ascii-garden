module.exports = async function (eleventyConfig) {

  const { HtmlBasePlugin } = await import("@11ty/eleventy");
  const { feedPlugin } = require("@11ty/eleventy-plugin-rss");
  const { eleventyImageTransformPlugin  } = require("@11ty/eleventy-img");

  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({ "CNAME": "CNAME" });

  eleventyConfig.addPassthroughCopy("404.html");
  eleventyConfig.addPassthroughCopy({ ".nojekyll": ".nojekyll" });

  eleventyConfig.addCollection("allPosts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/**/*.{md,html}");
  });

  eleventyConfig.addFilter("readableDate", (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  });

  eleventyConfig.addFilter("slice", (arr, start, end) => {
    if (!Array.isArray(arr)) return [];
    return arr.slice(start, end);
  });

  eleventyConfig.addFilter("filterByTag", (arr, tag) => {
    if (!Array.isArray(arr)) return [];
    return arr.filter(item => {
      const tags = item.data?.tags || [];
      return Array.isArray(tags) ? tags.includes(tag) : tags === tag;
    });
  });

  eleventyConfig.addFilter("getAllTags", (collection) => {
    const tags = new Set();
    collection.forEach(item => {
      const itemTags = item.data?.tags || [];
      (Array.isArray(itemTags) ? itemTags : [itemTags]).forEach(t => tags.add(t));
    });
    return Array.from(tags);
  });

  eleventyConfig.addFilter("sortByDateDesc", (arr) => {
    if (!Array.isArray(arr)) return [];
    return [...arr].sort((a, b) => {
      const da = new Date(a.date || a.data?.date || 0);
      const db = new Date(b.date || b.data?.date || 0);
      return db - da;
    });
  });


  eleventyConfig.addPlugin(HtmlBasePlugin);
  eleventyConfig.addPlugin(feedPlugin, {
		collection: {
			name: "allPosts",
			limit: 25,
		}, 
		metadata: {
			language: "en",
			title: "the ascii garden",
			subtitle: "apt's blog",
			base: "https://ascii.garden/",
			author: {
				name: "apt",
			}
		}   
  });

  eleventyConfig.addPlugin(eleventyImageTransformPlugin , {
    extensions: "html",
    widths: [200, 400],
    formats: ["gif"],
    transform: (sharp) => {
      sharp.gif({ colours: 12, dither: 0, effort: 1 });
    },
    defaultAttributes: {
      sizes: '100vw',
      loading: "lazy",
      decoding: "async",
    }
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
  };
};
