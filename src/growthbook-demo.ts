import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';

const logo = new URL('../../assets/looptimize_logo.png', import.meta.url).href;

@customElement('growthbook-demo')
export class GrowthbookDemo extends LitElement {
  @property({ type: String }) header = 'Growthbook Demo';

  static styles = css`
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(10px + 2vmin);
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-color: var(--growthbook-demo-background-color);
    }

    main {
      flex-grow: 1;
    }

    .logo {
      margin-top: 36px;
    }
  `;

  render() {
    return html`
      <main>
        <div class="logo"><img alt="open-wc logo" src=${logo} width="250"/></div>
        <h1>${this.header}</h1>
      </main>
    `;
  }
}
