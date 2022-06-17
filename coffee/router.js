function Router() {
  this.init = ($app, pages) => {
    this.$app = $app;
    this.pages = pages;
    this.route();

    window.addEventListener("popstate", () => this.route());
  };

  this.link = (pathname, payload) => {
    window.history.pushState(payload, null, "/coffee" + pathname);

    this.route();
  };

  this.route = () => {
    this.$app.innerHTML = ``;

    for (const [matcher, Page] of this.pages.entries()) {
      if (matcher.test(window.location.pathname)) {
        const page = new Page(this.$app);

        page.render();
        return;
      }
    }
  };
}

const router = new Router();

export default router;
