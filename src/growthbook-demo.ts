import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { logEvent } from "firebase/analytics";
import { FeatureController } from './feature-controller.js';


import '@material/web/navigationbar/navigation-bar.js';
import '@material/web/navigationtab/navigation-tab.js';
import '@material/web/icon/icon.js';
import './attribute-tab.js';
import './content-tab.js';

const logo = new URL('../../assets/looptimize_logo.png', import.meta.url).href;

// eslint-disable-next-line no-shadow
const enum DemoTabs { CONTENT_TAB, ATTRIBUTES_TAB };

@customElement('growthbook-demo')
export class GrowthbookDemo extends LitElement {
  @property({ type: String }) header = 'Growthbook Demo';

  private featureController = new FeatureController(this);

  @property() currentTab: DemoTabs = DemoTabs.CONTENT_TAB;

  static styles = css`
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(10px + 2vmin);
      color: var(--md-sys-color-on-surface-variant);
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-color: var(--md-sys-color-surface-variant);
    }

    main {
      flex-grow: 1;
    }

    .logo {
      margin-top: 36px;
    }
  `;

  private handleAttributesClick(){
    logEvent(this.featureController.analyticsService, 'select_content', {
      content_type: 'tab',
      content_id: 'user_attributes_tab'
    });
    this.currentTab = DemoTabs.ATTRIBUTES_TAB;
  }

  private handleContentClick(){
    logEvent(this.featureController.analyticsService, 'select_content', {
      content_type: 'tab',
      content_id: 'content_tab'
    });
    this.currentTab = DemoTabs.CONTENT_TAB;
  }

  render() {
    let tabContent;

    if (this.currentTab === DemoTabs.CONTENT_TAB) {
      tabContent = html`<content-tab .sampleFeatureEnabled=${this.featureController.sampleFeatureEnabled}></content-tab>`;
    }

    if (this.currentTab === DemoTabs.ATTRIBUTES_TAB) {
      tabContent = html`<attribute-tab></attribute-tab>`;
    }
    return html`
      <main>
        <div class="logo"><img alt="open-wc logo" src=${logo} width="250"/></div>
        <h1>${this.header}</h1>
        <md-navigation-bar>
          <md-navigation-tab label="Demo Content" @click=${this.handleContentClick}>
            <md-icon slot="activeIcon">star</md-icon>
            <md-icon slot="inactiveIcon">star</md-icon>
          </md-navigation-tab>
          <md-navigation-tab label="User Attributes" @click=${this.handleAttributesClick}>
            <md-icon slot="activeIcon">settings</md-icon>
            <md-icon slot="inactiveIcon">settings</md-icon>
          </md-navigation-tab>
        </md-navigation-bar>
        ${tabContent}
      </main>
    `;
  }
}
