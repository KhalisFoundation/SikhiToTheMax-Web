export default ({ url = location.href }) => (
  <div class="body_text row">
    <div class="small-12 medium-6 medium-offset-1 columns text-center">
      <h1 id="error-code">404</h1>
      <div id="error-msg">These are not the Singhs you are looking for.</div>
      <div id="error-desc">
        The requested URL <code>{url}</code> was not found on this server.
      </div>
    </div>
    <div class="small-12 medium-5 columns">
      <img src="/assets/images/404.png" />
    </div>
  </div>
);